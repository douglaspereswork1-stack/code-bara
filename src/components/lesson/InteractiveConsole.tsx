'use client'

import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { outputMatches } from '@/lib/exercise'
import { Play, RotateCcw, Terminal, AlertCircle, CheckCircle2, Lightbulb, ChevronRight, X, Loader2, TextCursorInput, Zap } from 'lucide-react'

type OutputLine = { type: 'log' | 'error' | 'warn' | 'info'; text: string }
type InputRequest = { message: string; resolve: (value: string) => void } | null

type Props = {
  code: string
  language?: string
  hints?: string[]
  expected?: string[]
  exerciseId?: string
}

// ponytail: timeouts fixos; Pyodide precisa de folga porque o 1º run inclui o load do CDN
const JS_TIMEOUT_MS = 3000
const PY_TIMEOUT_MS = 15000

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [breakpoint])
  return isMobile
}

function detectHints(code: string, errorText: string, hints: string[], language: string): string[] {
  const suggestions: string[] = []
  const lower = code.toLowerCase()
  const errLower = errorText.toLowerCase()
  const isPython = language === 'python'

  if (language === 'sql') {
    if (errLower.includes('no such table')) suggestions.push('💡 Tabela não existe — as disponíveis são alunos, cursos e matriculas.')
    if (errLower.includes('no such column')) suggestions.push('💡 Coluna não existe — confira o nome na descrição do exercício.')
    if (errLower.includes('syntax error')) suggestions.push('💡 Erro de sintaxe SQL — verifique vírgulas entre colunas e a ordem SELECT … FROM … WHERE … ORDER BY.')
  } else if (isPython) {
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

export function InteractiveConsole({ code: initialCode, language = 'javascript', hints = [], expected = [], exerciseId }: Props) {
  const [code, setCode] = useState(initialCode.trim())
  const [output, setOutput] = useState<OutputLine[]>([])
  const [running, setRunning] = useState(false)
  const [status, setStatus] = useState('')
  const [visibleHints, setVisibleHints] = useState(0)
  const [autoHints, setAutoHints] = useState<string[]>([])
  const [validation, setValidation] = useState<'pass' | 'fail' | null>(null)
  const [expectedOutput, setExpectedOutput] = useState<string[]>([])
  const [inputRequest, setInputRequest] = useState<InputRequest>(null)
  const [inputValue, setInputValue] = useState('')
  const [xpAwarded, setXpAwarded] = useState<{ xp: number; total: number } | null>(null)
  const workerRef = useRef<Worker | null>(null)

  const isPython = language === 'python'
  const isSql = language === 'sql'
  const isMobile = useIsMobile()
  // Python e SQL rodam no Pyodide — mesmo custo de carga
  const timeoutMs = isPython || isSql ? PY_TIMEOUT_MS : JS_TIMEOUT_MS

  const totalHints = hints.length
  const showHintButton = totalHints > 0 || autoHints.length > 0
  const allHints = useMemo(() => [...autoHints, ...hints.filter((h) => !autoHints.includes(h))], [autoHints, hints])

  useEffect(() => () => workerRef.current?.terminate(), [])

  const submitInput = useCallback(() => {
    if (inputRequest) {
      inputRequest.resolve(inputValue)
      setInputRequest(null)
      setInputValue('')
    }
  }, [inputRequest, inputValue])

  // Executa no worker (public/runner-worker.js). Timeout mata o worker — o Pyodide carregado vai junto,
  // então Python recarrega (~3s) na próxima execução. Timer pausa enquanto espera input do aluno.
  const runInWorker = useCallback((codeStr: string) => new Promise<{ lines: OutputLine[]; errorMsg: string }>((resolve) => {
    const lines: OutputLine[] = []
    let timer: ReturnType<typeof setTimeout> | undefined
    const worker = workerRef.current ?? (workerRef.current = new Worker('/runner-worker.js'))

    const finish = (errorMsg: string) => {
      clearTimeout(timer)
      worker.onmessage = null
      setStatus('')
      resolve({ lines, errorMsg })
    }
    const arm = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        worker.terminate()
        workerRef.current = null
        lines.push({ type: 'error', text: `⏱ Tempo limite (${timeoutMs / 1000}s) — loop infinito?` })
        finish('timeout')
      }, timeoutMs)
    }

    worker.onmessage = (e: MessageEvent) => {
      const msg = e.data
      if (msg.type === 'line') lines.push(msg.line)
      else if (msg.type === 'status') { setStatus(msg.text); if (msg.text) clearTimeout(timer); else arm() }
      else if (msg.type === 'input') {
        clearTimeout(timer)
        setInputValue('')
        setInputRequest({ message: msg.message, resolve: (value) => { worker.postMessage({ type: 'input-reply', value }); arm() } })
      }
      else if (msg.type === 'done') finish(msg.error)
    }
    worker.onerror = (e) => { lines.push({ type: 'error', text: `❌ ${e.message}` }); finish(e.message) }
    arm()
    worker.postMessage({ type: 'run', lang: isPython ? 'python' : isSql ? 'sql' : 'javascript', code: codeStr })
  }), [isPython, isSql, timeoutMs])

  const runCode = useCallback(async () => {
    setRunning(true)
    setOutput([])
    setValidation(null)
    setExpectedOutput([])
    setInputRequest(null)
    setXpAwarded(null)

    const { lines, errorMsg } = await runInWorker(code)

    if (lines.length === 0) lines.push({ type: 'info', text: '(nenhum output)' })

    if (errorMsg || lines.every((l) => l.type !== 'log')) {
      const detected = detectHints(code, errorMsg, hints, language)
      if (detected.length > 0) setAutoHints(detected)
    }

    const actualLines = lines.filter((l) => l.type === 'log').map((l) => l.text)
    if (exerciseId) {
      // Exercício do banco: gabarito e XP ficam no servidor
      try {
        const res = await fetch('/api/progress/exercise', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ exerciseId, output: actualLines }),
        })
        const data = await res.json()
        if (data.ok) {
          setValidation(data.passed ? 'pass' : 'fail')
          if (!data.passed) setExpectedOutput(data.expected ?? [])
          if (data.passed && !data.alreadyAwarded) setXpAwarded({ xp: data.xpEarned, total: data.total })
        }
      } catch { /* offline: fica sem veredito */ }
    } else if (expected.length > 0) {
      // Bloco :::interactive do markdown: só feedback, sem XP
      const match = outputMatches(expected, actualLines)
      setValidation(match ? 'pass' : 'fail')
      if (!match) setExpectedOutput(expected)
    }

    setOutput(lines)
    setRunning(false)
  }, [code, hints, expected, language, runInWorker, exerciseId])

  const hasOutput = output.length > 0
  const hasError = output.some((l) => l.type === 'error')
  const hasLog = output.some((l) => l.type === 'log')

    return (
    <div className="my-5 rounded-xl border border-[#8B5CF6]/30 bg-[#0A1128] overflow-hidden">
      {/* Input Dialog */}
      {inputRequest && (
        <div className="border-b border-[#8B5CF6]/30 bg-[#8B5CF6]/[0.08] px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <TextCursorInput className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-[13px] text-[#C4B5FD] font-medium">{inputRequest.message}</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') submitInput() }}
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#0A1128] border border-[#8B5CF6]/30 text-white text-[13px] font-mono placeholder:text-[#64748B] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
              placeholder="Digite sua resposta..."
              autoFocus
            />
            <button
              type="button"
              onClick={submitInput}
              className="px-4 py-1.5 rounded-lg bg-[#8B5CF6] text-white text-[13px] font-bold hover:brightness-110 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#8B5CF6]/[0.06]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#8B5CF6]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#C4B5FD]">
            Console Interativo
          </span>
          {(isPython || isSql) && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#3572A5]/20 text-[#6DB0E8] border border-[#3572A5]/30">
              {isSql ? 'SQL' : 'Python'}
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
            onClick={() => { workerRef.current?.terminate(); workerRef.current = null; setRunning(false); setCode(initialCode.trim()); setOutput([]); setVisibleHints(0); setAutoHints([]); setValidation(null); setExpectedOutput([]); setInputRequest(null) }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Resetar
          </button>
          <button
            type="button"
            onClick={runCode}
            disabled={running || !!inputRequest}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#10B981] text-white hover:brightness-110 transition disabled:opacity-50"
          >
            {status ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> {status}</>
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
      <div className="border-b border-white/[0.06]">
        {isMobile ? (
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[200px] p-4 bg-[#1E1E1E] text-[#D4D4D4] font-mono text-[13px] leading-relaxed resize-none focus:outline-none placeholder:text-[#64748B]"
            placeholder={isPython ? '# Escreva seu código Python aqui...' : isSql ? '-- Escreva sua query SQL aqui...' : '// Escreva seu código JavaScript aqui...'}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        ) : (
          <div className="h-[200px]">
            <Editor
              language={language}
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
        )}
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

      {/* XP awarded */}
      {xpAwarded && (
        <div className="px-4 py-2 bg-[#FACC15]/[0.08] border-t border-[#FACC15]/20 text-[13px] text-[#FACC15] font-bold flex items-center gap-2">
          <Zap className="w-4 h-4" /> +{xpAwarded.xp} XP ganho! Total: {xpAwarded.total} XP
        </div>
      )}
    </div>
  )
}
