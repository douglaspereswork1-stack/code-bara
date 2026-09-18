"use client"
import { useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { Lightbulb, AlertTriangle, Rocket, BookOpenCheck, Info, Copy, Check } from 'lucide-react'
import { InteractiveConsole } from '@/components/lesson/InteractiveConsole'
import 'highlight.js/styles/github-dark-dimmed.css'

// Callouts: blockquote que começa com um marcador vira caixa colorida.
//   > 💡 dica        > ⚠️ atenção        > 🚀 faça você mesmo
//   > 📗 exercício   > ℹ️ nota (padrão)
const CALLOUTS: Record<string, { icon: typeof Info; cls: string; label: string }> = {
  '💡': { icon: Lightbulb, cls: 'border-[#FACC15]/40 bg-[#FACC15]/[0.07] text-[#FACC15]', label: 'Dica' },
  '⚠️': { icon: AlertTriangle, cls: 'border-[#F97316]/40 bg-[#F97316]/[0.07] text-[#F97316]', label: 'Atenção' },
  '🚀': { icon: Rocket, cls: 'border-[#8B5CF6]/40 bg-[#8B5CF6]/[0.08] text-[#C4B5FD]', label: 'Faça você mesmo' },
  '📗': { icon: BookOpenCheck, cls: 'border-[#10B981]/40 bg-[#10B981]/[0.07] text-[#10B981]', label: 'Exercício' },
  'ℹ️': { icon: Info, cls: 'border-[#22D3EE]/40 bg-[#22D3EE]/[0.07] text-[#22D3EE]', label: 'Nota' },
}

function firstText(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(firstText).join('')
  if (node && typeof node === 'object' && 'props' in node) return firstText((node as { props: { children?: ReactNode } }).props.children)
  return ''
}

function stripMarker(node: ReactNode, marker: string): ReactNode {
  if (typeof node === 'string') return node.replace(marker, '').replace(/^\s+/, '')
  if (Array.isArray(node)) { const [h, ...r] = node; return [stripMarker(h, marker), ...r] }
  if (node && typeof node === 'object' && 'props' in node) {
    const el = node as React.ReactElement<{ children?: ReactNode }>
    return { ...el, props: { ...el.props, children: stripMarker(el.props.children, marker) } }
  }
  return node
}

function CodeBlock({ children, className }: { children?: ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false)
  const lang = (className || '').replace('hljs', '').replace('language-', '').trim() || 'code'
  const raw = firstText(children)
  return (
    <div className="my-5 rounded-xl border border-white/[0.08] bg-[#0A1128] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#22D3EE]">{lang}</span>
        <button
          type="button"
          onClick={() => { navigator.clipboard?.writeText(raw); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
          className="inline-flex items-center gap-1 text-[11px] text-[#94A3B8] hover:text-white transition"
          aria-label="Copiar código"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />} {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed"><code className={className}>{children}</code></pre>
    </div>
  )
}

export type InteractiveBlock = { id: string; code: string; language: string; hints: string[]; expected: string[] }

const INTERACTIVE_RE = /^:::interactive(?:\s+(\w+))?\s*\n((?:^:::(?:hint|expected)\s+.*\n)*)```(\w*)\n([\s\S]*?)```\s*$/gm

export function parseInteractiveBlocks(content: string): { clean: string; blocks: InteractiveBlock[] } {
  const blocks: InteractiveBlock[] = []
  let counter = 0
  const clean = content.replace(INTERACTIVE_RE, (_match, lang: string, hintBlock: string, fenceLang: string, code: string) => {
    const id = `__interactive_${counter++}`
    const hints: string[] = []
    const expected: string[] = []
    for (const line of hintBlock.split('\n')) {
      if (line.startsWith(':::hint')) hints.push(line.replace(/^:::hint\s*/, '').trim())
      else if (line.startsWith(':::expected')) expected.push(line.replace(/^:::expected\s*/, '').trim())
    }
    blocks.push({ id, code: code.trimEnd(), language: lang || fenceLang || 'javascript', hints, expected })
    return `:::${id}`
  })
  return { clean, blocks }
}

export function LessonMarkdown({ content, interactiveBlocks = [] }: { content: string; interactiveBlocks?: InteractiveBlock[] }) {
  const blockMap = new Map(interactiveBlocks.map((b) => [b.id, b]))

  return (
    <div className="lesson-md text-[#CBD5E1] leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => <h1 className="text-2xl font-black text-white mb-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-bold text-white mt-8 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-semibold text-white mt-6 mb-2">{children}</h3>,
          p: ({ children }) => {
            const text = firstText(children).trim()
            const match = text.match(/^:::(interactive_\d+)$/)
            if (match && blockMap.has(match[1])) {
              const block = blockMap.get(match[1])!
              return <InteractiveConsole code={block.code} language={block.language} hints={block.hints} expected={block.expected} />
            }
            return <p className="my-3">{children}</p>
          },
          a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#22D3EE] hover:underline">{children}</a>,
          ul: ({ children }) => <ul className="my-3 ml-5 list-disc space-y-1 marker:text-[#22D3EE]">{children}</ul>,
          ol: ({ children }) => <ol className="my-3 ml-5 list-decimal space-y-1 marker:text-[#22D3EE]">{children}</ol>,
          strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
          hr: () => <hr className="my-8 border-white/[0.08]" />,
          table: ({ children }) => <div className="my-4 overflow-x-auto rounded-xl border border-white/[0.08]"><table className="w-full text-sm">{children}</table></div>,
          th: ({ children }) => <th className="px-3 py-2 text-left font-semibold text-white bg-white/[0.04] border-b border-white/[0.08]">{children}</th>,
          td: ({ children }) => <td className="px-3 py-2 border-b border-white/[0.05] align-top">{children}</td>,
          // eslint-disable-next-line @next/next/no-img-element
          img: ({ src, alt }) => <img src={typeof src === 'string' ? src : ''} alt={alt || ''} loading="lazy" className="my-4 rounded-xl border border-white/[0.08] max-w-full" />,
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children }) => {
            const isBlock = /language-|hljs/.test(className || '') || String(children).includes('\n')
            if (isBlock) return <CodeBlock className={className}>{children}</CodeBlock>
            return <code className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[#22D3EE] text-[0.9em]">{children}</code>
          },
          blockquote: ({ children }) => {
            const text = firstText(children).trim()
            const key = Object.keys(CALLOUTS).find((k) => text.startsWith(k)) || 'ℹ️'
            const c = CALLOUTS[key]
            const Icon = c.icon
            const body = text.startsWith(key) ? stripMarker(children, key) : children
            return (
              <div className={`my-5 rounded-xl border px-4 py-3 ${c.cls}`}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide mb-1"><Icon className="w-4 h-4" aria-hidden /> {c.label}</div>
                <div className="text-[#CBD5E1] [&>p]:my-1">{body}</div>
              </div>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
