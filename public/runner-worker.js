// Roda o código do aluno FORA da main thread. A página mata o worker por timeout
// (worker.terminate()) — é a única forma de parar um while(true) sem travar a aba.
// Protocolo: recebe {type:'run', lang, code} | {type:'input-reply', value}
//            envia  {type:'line', line:{type,text}} | {type:'input', message} | {type:'status', text} | {type:'done', error}
const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
let pyodide = null
let pendingInput = null

const post = (m) => self.postMessage(m)
const line = (type, text) => post({ type: 'line', line: { type, text } })
const fmt = (a) => (typeof a === 'object' && a !== null ? JSON.stringify(a, null, 2) : String(a))

function askInput(message) {
  return new Promise((resolve) => {
    pendingInput = resolve
    post({ type: 'input', message })
  })
}

// prompt()/input() só podem ser assíncronos aqui (sem SharedArrayBuffer não há bloqueio síncrono).
// Pra `const nome = prompt("...")` funcionar como o aluno espera, injetamos o await.
// ponytail: quebra dentro de function/def não-async — sync de verdade exige COOP/COEP + Atomics.wait
const AUTO_AWAIT = { prompt: /(?<!await\s)\bprompt\(/g, input: /(?<!await\s)\binput\(/g }
const autoAwait = (code, fn) => code.replace(AUTO_AWAIT[fn], `await ${fn}(`)

async function runJs(code) {
  const sandbox = {
    console: {
      log: (...a) => line('log', a.map(fmt).join(' ')),
      error: (...a) => line('error', a.map(fmt).join(' ')),
      warn: (...a) => line('warn', a.map(fmt).join(' ')),
      info: (...a) => line('info', a.map(fmt).join(' ')),
    },
    alert: (m) => line('info', 'Alert: ' + m),
    prompt: (m) => askInput(m || 'Digite algo:'),
    confirm: (m) => { line('info', 'Confirm: ' + (m || '')); return true },
  }
  const fn = new Function(...Object.keys(sandbox), `return (async () => { ${autoAwait(code, 'prompt')} })()`)
  await fn(...Object.values(sandbox))
}

async function runPython(code) {
  if (!pyodide) {
    post({ type: 'status', text: 'Carregando Python...' })
    importScripts(PYODIDE_CDN + 'pyodide.js')
    pyodide = await loadPyodide({ indexURL: PYODIDE_CDN })
    pyodide.registerJsModule('_browser', { input: (m) => askInput(String(m || 'Digite algo:')) })
    await pyodide.runPythonAsync(
      'import builtins, _browser\n' +
      'async def _async_input(prompt_str=""):\n' +
      '    return await _browser.input(str(prompt_str))\n' +
      'builtins.input = _async_input\n'
    )
    post({ type: 'status', text: '' })
  }
  pyodide.setStdout({ batched: (s) => line('log', s) })
  pyodide.setStderr({ batched: (s) => line('error', s) })
  await pyodide.runPythonAsync(autoAwait(code, 'input'))
}

// Traceback do Pyodide inclui frames internos (_base.py); pro aluno só a última linha importa
// (ex.: NameError: name 'x' is not defined) + a linha do <exec> se existir.
const cleanPy = (msg) => {
  const rows = msg.trim().split('\n')
  const where = rows.find((r) => r.includes('File "<exec>"'))
  const lineNo = where && where.match(/line (\d+)/)
  return (lineNo ? `linha ${lineNo[1]}: ` : '') + rows[rows.length - 1].trim()
}

self.onmessage = async (e) => {
  const msg = e.data
  if (msg.type === 'input-reply') { if (pendingInput) pendingInput(msg.value); pendingInput = null; return }
  if (msg.type !== 'run') return
  let error = ''
  try {
    if (msg.lang === 'python') await runPython(msg.code)
    else await runJs(msg.code)
  } catch (err) {
    error = err instanceof Error ? err.message : String(err)
    line('error', '❌ ' + (msg.lang === 'python' ? cleanPy(error) || error : error))
  }
  post({ type: 'done', error })
}
