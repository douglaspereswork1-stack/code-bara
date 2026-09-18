'use client'

import { useState, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Terminal, AlertCircle, CheckCircle2 } from 'lucide-react'

type OutputLine = { type: 'log' | 'error' | 'warn' | 'info'; text: string }

type Props = {
  code: string
  language?: string
}

export function InteractiveConsole({ code: initialCode, language = 'javascript' }: Props) {
  const [code, setCode] = useState(initialCode.trim())
  const [output, setOutput] = useState<OutputLine[]>([])
  const [running, setRunning] = useState(false)

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

    try {
      const keys = Object.keys(sandbox)
      const fn = new Function(...keys, code)
      fn(...Object.values(sandbox))
    } catch (err) {
      push('error', [`❌ ${err instanceof Error ? err.message : String(err)}`])
    }

    if (lines.length === 0) {
      lines.push({ type: 'info', text: '(nenhum output)' })
    }

    setOutput(lines)
    setRunning(false)
  }, [code])

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
          <button
            type="button"
            onClick={() => { setCode(initialCode.trim()); setOutput([]) }}
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
      {output.length > 0 && (
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
    </div>
  )
}
