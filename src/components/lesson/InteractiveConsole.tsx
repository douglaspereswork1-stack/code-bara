'use client'

import { useState, useCallback, useMemo, useRef } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Terminal, AlertCircle, CheckCircle2, Lightbulb, ChevronRight, X, Loader2 } from 'lucide-react'

type OutputLine = { type: 'log' | 'error' | 'warn' | 'info'; text: string }

type Props = {
  code: string
  language?: string
  hints?: string[]
  expected?: string[]
}

// Pyodide instance cache (shared across components, loaded from CDN)
const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/'
let pyodideInstance: unknown = null
let pyodidePromise: Promise<unknown> | null = null

async function getPyodide() {
  if (pyodideInstance) return pyodideInstance
  if (pyodidePromise) return pyodidePromise

  pyodidePromise = (async () => {
    // Load Pyodide from CDN
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pyodide = await (window as any).loadPyodide({
      indexURL: PYODIDE_CDN,
    })
    pyodideInstance = pyodide
    return pyodide
  })()

  return pyodidePromise
}

// Inject loadPyodide script tag if not already present
function ensurePyodideScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && 'loadPyodide' in window) {
      resolve()
      return
    }
    const existing = document.querySelector(`script[src="${PYODIDE_CDN}pyodide.js"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      return
    }
    const script = document.createElement('script')
    script.src = `${PYODIDE_CDN}pyodide.js`
    script.async = true
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

function detectHints(code: string, errorText: string, hints: string[], language: string): string[] {
  const suggestions: string[] = []
  const lower = code.toLowerCase()
  const errLower = errorText.toLowerCase()
  const isPython = language === 'python'

  if (isPython) {
    if (!lower.includes('print(') && !lower.includes('print (')) {
      suggestions.push('💡 Você não usou print() — sem ele nada aparece no console!')
    }
    if (errLower.includes('nameerror') || errLower.includes('not defined')) {
      const match = errorText.match(/name '(\w+)' is not defined/)
      if (match) suggestions.push(`💡 A variável "${match[1]}" não foi definida. Defina com ${match[1]} = valor`)
    }
    if (errLower.includes('syntaxerror') || errLower.includes('syntax')) {
      suggestions.push('💡 Erro de sintaxe — verifique a indentação e os dois-pontos (:).')
    }
    if (errLower.includes('indentationerror') || errLower.includes('indent')) {
      suggestions.push('💡 Erro de indentação — use espaços (4) ou tab, mas não misture.')
    }
    if (errLower.includes('typeerror') && errLower.includes('unsupported operand')) {
      suggestions.push('💡 Não pode somar texto com número. Use str() para converter.')
    }
  } else {
    if (!lower.includes('console.log') && !lower.includes('console.')) {
      suggestions.push('💡 Você não usou console.log() — sem ele nada aparece no console!')
    }
    if (errLower.includes('is not defined') || errLower.includes('not defined')) {
      const match = errorText.match(/(\w+)\s+is not defined/)
      if (match) suggestions.push(`💡 A variável "${match[1]}" não foi declarada. Use let, const ou var.`)
    }
    if (errLower.includes('unexpected token') || errLower.includes('syntaxerror')) {
      suggestions.push('💡 Erro de sintaxe — verifique se faltou uma vírgula, ponto e vírgula ou chave.')
    }
    if (errLower.includes('missing') && errLower.includes('statement')) {
      suggestions.push('💡 Falta uma instrução depois do if/for/while. Adicione { } com o código.')
    }
  }

  const customSuggestions = hints.filter((h) => {
    const hl = h.toLowerCase()
    if (isPython) {
      if (!lower.includes('print') && hl.includes('print')) return true
      if (errLower.includes('not defined') && hl.includes('defin')) return true
    } else {
      if (!lower.includes('console.log') && hl.includes('console.log')) return true
      if (errLower.includes('not defined') && hl.includes('declar')) return true
    }
    if (errLower.includes('syntax') && hl.includes('sintaxe')) return true
    if (errLower.includes('unexpected') && hl.includes('esperado')) return true
    return false
  })

  return [...suggestions, ...customSuggestions]
}

function normalize(text: string): string {
  return text.trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '')
}

export function InteractiveConsole({ code: initialCode, language = 'javascript', hints = [], expected = [] }: Props) {
  const [code, setCode] = useState(initialCode.trim())
  const [output, setOutput] = useState<OutputLine[]>([])
  const [running, setRunning] = useState(false)
  const [loadingPyodide, setLoadingPyodide] = useState(false)
  const [visibleHints, setVisibleHints] = useState(0)
  const [autoHints, setAutoHints] = useState<string[]>([])
  const [validation, setValidation] = useState<'pass' | 'fail' | null>(null)
  const [expectedOutput, setExpectedOutput] = useState<string[]>([])
  const pyodideRef = useRef<unknown>(null)

  const isPython = language === 'python'

  const totalHints = hints.length
  const showHintButton = totalHints > 0 || autoHints.length > 0
  const allHints = useMemo(() => [...autoHints, ...hints.filter((h) => !autoHints.includes(h))], [autoHints, hints])

  const runJavaScript = useCallback((codeStr: string) => {
    const lines: OutputLine[] = []
    const push = (type: OutputLine['type'], args: unknown[]) => {
      const text = args
        .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
        .join(' ')
      lines.push({ type, text })
    }

    const sandbox = {
      console: {
        log: (...args: unknown[]) => push('log', args),
        error: (...args: unknown[]) => push('error', args),
        warn: (...args: unknown[]) => push('warn', args),
        info: (...args: unknown[]) => push('info', args),
      },
      alert: (msg: unknown) => push('info', [`Alert: ${msg}`]),
      prompt: () => '',
      confirm: () => true,
    }

    let errorMsg = ''
    try {
      const keys = Object.keys(sandbox)
      const fn = new Function(...keys, codeStr)
      fn(...Object.values(sandbox))
    } catch (err) {
      errorMsg = err instanceof Error ? err.message : String(err)
      push('error', [`❌ ${errorMsg}`])
    }

    return { lines, errorMsg }
  }, [])

  const runPython = useCallback(async (codeStr: string) => {
    const lines: OutputLine[] = []
    const push = (type: OutputLine['type'], text: string) => lines.push({ type, text })

    let errorMsg = ''
    try {
      if (!pyodideRef.current) {
        setLoadingPyodide(true)
        await ensurePyodideScript()
        pyodideRef.current = await getPyodide()
        setLoadingPyodide(false)
      }

      const pyodide = pyodideRef.current as { runPythonAsync: (code: string) => Promise<unknown>; setStdout: (fn: (msg: string) => void) => void; setStderr: (fn: (msg: string) => void) => void }

      pyodide.setStdout((msg: string) => push('log', msg.trimEnd()))
      pyodide.setStderr((msg: string) => push('error', msg.trimEnd()))

      await pyodide.runPythonAsync(codeStr)
    } catch (err) {
      errorMsg = err instanceof Error ? err.message : String(err)
      // Clean up Python traceback noise
      const clean = errorMsg
        .replace(/File "<exec>",\s*\d+,?\s*/g, '')
        .replace(/Traceback \(most recent call last\):\s*/g, '')
        .replace(/^  File\s+/gm, '  → ')
        .trim()
      push('error', `❌ ${clean || errorMsg}`)
    }

    return { lines, errorMsg }
  }, [])

  const runCode = useCallback(async () => {
    setRunning(true)
    setOutput([])
    setValidation(null)
    setExpectedOutput([])

    const { lines, errorMsg } = isPython
      ? await runPython(code)
      : runJavaScript(code)

    if (lines.length === 0) {
      lines.push({ type: 'info', text: '(nenhum output)' })
    }

    if (errorMsg || lines.every((l) => l.type !== 'log')) {
      const detected = detectHints(code, errorMsg, hints, language)
      if (detected.length > 0) setAutoHints(detected)
    }

    if (expected.length > 0) {
      const actualLines = lines.filter((l) => l.type === 'log').map((l) => normalize(l.text))
      const expectedLines = expected.map(normalize)
      const match = expectedLines.length === actualLines.length &&
        expectedLines.every((e, i) => e === actualLines[i])
      setValidation(match ? 'pass' : 'fail')
      if (!match) setExpectedOutput(expected)
    }

    setOutput(lines)
    setRunning(false)
  }, [code, hints, expected, isPython, runJavaScript, runPython])

  const hasOutput = output.length > 0
  const hasError = output.some((l) => l.type === 'error')
  const hasLog = output.some((l) => l.type === 'log')

  return (
    <div className="my-5 rounded-xl border border-[#8B5CF6]/30 bg-[#0A1128] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#8B5CF6]/[0.06]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#8B5CF6]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD]">
            Console Interativo
          </span>
          {isPython && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3572A5]/20 text-[#6DB0E8] border border-[#3572A5]/30">
              Python
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showHintButton && (
            <button
              type="button"
              onClick={() => setVisibleHints((v) => Math.min(v + 1, allHints.length))}
              disabled={visibleHints >= allHints.length}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#FACC15] hover:bg-[#FACC15]/10 transition disabled:opacity-30"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              Dica{visibleHints > 0 ? ` (${visibleHints}/${allHints.length})` : ''}
            </button>
          )}
          <button
            type="button"
            onClick={() => { setCode(initialCode.trim()); setOutput([]); setVisibleHints(0); setAutoHints([]); setValidation(null); setExpectedOutput([]) }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Resetar
          </button>
          <button
            type="button"
            onClick={runCode}
            disabled={running || loadingPyodide}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#10B981] text-white hover:brightness-110 transition disabled:opacity-50"
          >
            {loadingPyodide ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Carregando Python...</>
            ) : (
              <><Play className="w-3.5 h-3.5" fill="currentColor" /> {running ? 'Rodando...' : 'Executar'}</>
            )}
          </button>
        </div>
      </div>

      {/* Hints */}
      {visibleHints > 0 && (
        <div className="border-b border-white/[0.06] bg-[#FACC15]/[0.04] px-4 py-3 space-y-2">
          {allHints.slice(0, visibleHints).map((hint, i) => (
            <div key={i} className="flex items-start gap-2 text-[13px] text-[#FACC15]">
              <ChevronRight className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              <span>{hint.replace(/^[💡🔑📋⏱️🎯]\s*/, '')}</span>
            </div>
          ))}
          {visibleHints < allHints.length && (
            <button
              type="button"
              onClick={() => setVisibleHints((v) => v + 1)}
              className="text-[11px] text-[#FACC15]/60 hover:text-[#FACC15] transition ml-5"
            >
              Ver próxima dica →
            </button>
          )}
        </div>
      )}

      {/* Editor */}
      <div className="h-[200px] border-b border-white/[0.06]">
        <Editor
          language={isPython ? 'python' : language}
          value={code}
          onChange={(v) => setCode(v ?? '')}
          theme="vs-dark"
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            padding: { top: 12, bottom: 12 },
            lineNumbers: 'on',
            tabSize: isPython ? 4 : 2,
            wordWrap: 'on',
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            renderLineHighlight: 'none',
            scrollbar: { vertical: 'hidden', horizontal: 'auto' },
          }}
        />
      </div>

      {/* Output */}
      {hasOutput && (
        <div className="max-h-[200px] overflow-y-auto">
          {output.map((line, i) => (
            <div
              key={i}
              className={`px-4 py-1.5 text-[13px] font-mono border-b border-white/[0.03] ${
                line.type === 'error'
                  ? 'text-[#F87171] bg-[#F87171]/[0.05]'
                  : line.type === 'warn'
                  ? 'text-[#FACC15] bg-[#FACC15]/[0.03]'
                  : line.type === 'info'
                  ? 'text-[#94A3B8] bg-white/[0.02]'
                  : 'text-[#E2E8F0]'
              }`}
            >
              {line.type === 'error' && <AlertCircle className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />}
              {line.type === 'log' && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5 text-[#10B981]" />}
              {line.text}
            </div>
          ))}
        </div>
      )}

      {/* Validation feedback */}
      {validation === 'pass' && (
        <div className="px-4 py-2.5 bg-[#10B981]/[0.08] border-t border-[#10B981]/20 text-[13px] text-[#10B981] font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Correto! Seu código produziu a saída esperada.
        </div>
      )}
      {validation === 'fail' && (
        <div className="px-4 py-2.5 bg-[#F87171]/[0.08] border-t border-[#F87171]/20 text-[13px] text-[#F87171]">
          <div className="font-bold flex items-center gap-2 mb-1.5">
            <X className="w-4 h-4" /> Saída incorreta
          </div>
          <div className="font-mono text-[12px] opacity-80">
            Esperado: {expectedOutput.map((e, i) => (
              <span key={i} className="block pl-2">&gt; {e}</span>
            ))}
          </div>
        </div>
      )}

      {/* Generic success (no expected output defined) */}
      {validation === null && hasLog && !hasError && expected.length === 0 && (
        <div className="px-4 py-2 bg-[#10B981]/[0.06] border-t border-[#10B981]/20 text-[13px] text-[#10B981] font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Código executado com sucesso!
        </div>
      )}
    </div>
  )
}
