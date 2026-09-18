'use client'

import { useState, useCallback, useMemo } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Terminal, AlertCircle, CheckCircle2, Lightbulb, ChevronRight } from 'lucide-react'

type OutputLine = { type: 'log' | 'error' | 'warn' | 'info'; text: string }

type Props = {
  code: string
  language?: string
  hints?: string[]
}

function detectHints(code: string, errorText: string, hints: string[]): string[] {
  const suggestions: string[] = []
  const lower = code.toLowerCase()
  const errLower = errorText.toLowerCase()

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

  const customSuggestions = hints.filter((h) => {
    const hl = h.toLowerCase()
    if (!lower.includes('console.log') && hl.includes('console.log')) return true
    if (errLower.includes('not defined') && hl.includes('declar')) return true
    if (errLower.includes('syntax') && hl.includes('sintaxe')) return true
    if (errLower.includes('unexpected') && hl.includes('esperado')) return true
    return false
  })

  return [...suggestions, ...customSuggestions]
}

export function InteractiveConsole({ code: initialCode, language = 'javascript', hints = [] }: Props) {
  const [code, setCode] = useState(initialCode.trim())
  const [output, setOutput] = useState<OutputLine[]>([])
  const [running, setRunning] = useState(false)
  const [visibleHints, setVisibleHints] = useState(0)
  const [autoHints, setAutoHints] = useState<string[]>([])

  const totalHints = hints.length
  const showHintButton = totalHints > 0 || autoHints.length > 0
  const allHints = useMemo(() => [...autoHints, ...hints.filter((h) => !autoHints.includes(h))], [autoHints, hints])

  const runCode = useCallback(() => {
    setRunning(true)
    setOutput([])

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
      const fn = new Function(...keys, code)
      fn(...Object.values(sandbox))
    } catch (err) {
      errorMsg = err instanceof Error ? err.message : String(err)
      push('error', [`❌ ${errorMsg}`])
    }

    if (lines.length === 0) {
      lines.push({ type: 'info', text: '(nenhum output)' })
    }

    if (errorMsg || lines.every((l) => l.type !== 'log')) {
      const detected = detectHints(code, errorMsg, hints)
      if (detected.length > 0) setAutoHints(detected)
    }

    setOutput(lines)
    setRunning(false)
  }, [code, hints])

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
            onClick={() => { setCode(initialCode.trim()); setOutput([]); setVisibleHints(0); setAutoHints([]) }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Resetar
          </button>
          <button
            type="button"
            onClick={runCode}
            disabled={running}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#10B981] text-white hover:brightness-110 transition disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" fill="currentColor" /> {running ? 'Rodando...' : 'Executar'}
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
            tabSize: 2,
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

      {/* Success feedback */}
      {hasLog && !hasError && (
        <div className="px-4 py-2 bg-[#10B981]/[0.06] border-t border-[#10B981]/20 text-[13px] text-[#10B981] font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Código executado com sucesso!
        </div>
      )}
    </div>
  )
}
