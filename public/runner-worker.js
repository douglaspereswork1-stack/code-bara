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

async function ensurePyodide(label) {
  if (pyodide) return
  post({ type: 'status', text: `Carregando ${label}...` })
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

async function runPython(code) {
  await ensurePyodide('Python')
  pyodide.setStdout({ batched: (s) => line('log', s) })
  pyodide.setStderr({ batched: (s) => line('error', s) })
  await pyodide.runPythonAsync(autoAwait(code, 'input'))
}

// SQL roda no sqlite3 que vem dentro do Pyodide, num banco em memória recriado a cada execução
// com o dataset fixo do curso (alunos / cursos / matriculas). Cada SELECT imprime as linhas como "a | b".
// ponytail: dataset único pro módulo inteiro; por-exercício exigiria coluna Exercise.setup
const SQL_DATASET = `
CREATE TABLE alunos (id INTEGER PRIMARY KEY, nome TEXT, cidade TEXT, idade INTEGER);
CREATE TABLE cursos (id INTEGER PRIMARY KEY, titulo TEXT, preco REAL);
CREATE TABLE matriculas (id INTEGER PRIMARY KEY, aluno_id INTEGER, curso_id INTEGER, nota INTEGER);
INSERT INTO alunos VALUES (1,'Ana','São Paulo',25),(2,'Bruno','Rio de Janeiro',31),(3,'Carla','São Paulo',22),(4,'Diego','Curitiba',28);
INSERT INTO cursos VALUES (1,'JavaScript',299.9),(2,'Python',199.9),(3,'SQL',149.9);
INSERT INTO matriculas VALUES (1,1,1,90),(2,1,2,85),(3,2,1,70),(4,3,3,95),(5,4,2,60),(6,3,1,80);
`
const SQL_RUNNER = `
import sqlite3
_con = sqlite3.connect(':memory:')
_con.executescript(_dataset)
_cur = _con.cursor()
for _stmt in [s.strip() for s in _sql.split(';') if s.strip()]:
    _cur.execute(_stmt)
    if _cur.description:
        for _row in _cur.fetchall():
            print(' | '.join(str(v) for v in _row))
`

let sqliteLoaded = false
async function runSql(code) {
  await ensurePyodide('SQL')
  if (!sqliteLoaded) {
    // sqlite3 é stdlib "unvendored" no Pyodide: vem em pacote separado
    post({ type: 'status', text: 'Carregando SQL...' })
    await pyodide.loadPackage('sqlite3')
    sqliteLoaded = true
    post({ type: 'status', text: '' })
  }
  pyodide.setStdout({ batched: (s) => line('log', s) })
  pyodide.setStderr({ batched: (s) => line('error', s) })
  pyodide.globals.set('_dataset', SQL_DATASET)
  pyodide.globals.set('_sql', code)
  await pyodide.runPythonAsync(SQL_RUNNER)
}

// Traceback do Pyodide inclui frames internos (_base.py); pro aluno só a última linha importa
// (ex.: NameError: name 'x' is not defined) + a linha do <exec> se existir.
const cleanPy = (msg, withLine) => {
  const rows = msg.trim().split('\n')
  const where = withLine && rows.find((r) => r.includes('File "<exec>"'))
  const lineNo = where && where.match(/line (\d+)/)
  // no SQL a linha do <exec> é do runner, não do aluno — só a mensagem (ex.: sqlite3.OperationalError: no such column: x)
  return (lineNo ? `linha ${lineNo[1]}: ` : '') + rows[rows.length - 1].trim().replace(/^sqlite3\.\w+Error: /, '')
}

self.onmessage = async (e) => {
  const msg = e.data
  if (msg.type === 'input-reply') { if (pendingInput) pendingInput(msg.value); pendingInput = null; return }
  if (msg.type !== 'run') return
  let error = ''
  try {
    if (msg.lang === 'python') await runPython(msg.code)
    else if (msg.lang === 'sql') await runSql(msg.code)
    else await runJs(msg.code)
  } catch (err) {
    error = err instanceof Error ? err.message : String(err)
    line('error', '❌ ' + (msg.lang === 'javascript' ? error : cleanPy(error, msg.lang === 'python') || error))
  }
  post({ type: 'done', error })
}
