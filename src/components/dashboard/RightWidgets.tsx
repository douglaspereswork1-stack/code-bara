import Link from 'next/link'
import { CheckCircle2, PlayCircle } from 'lucide-react'

export function RightWidgets() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-[#0D1528] to-[#111A32] border border-white/[0.06] p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 pointer-events-none" />
        <div className="relative">
          <h3 className="font-bold text-white leading-tight">Grandes desenvolvedores<br />nunca param.</h3>
          <p className="text-xs text-[#94A3B8] mt-2">Estudo de hoje,<br />oportunidades de amanhã.</p>
          <Link href="/curso/dev-fullstack" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-sm font-semibold shadow-lg shadow-[#3B82F6]/20 hover:brightness-110 transition">
            <PlayCircle className="w-4 h-4" /> Ver próximos cursos
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6">
        <h3 className="font-semibold text-white text-sm">Atividade Recente</h3>
        <div className="mt-4 space-y-3 text-sm">
          {[
            { icon: <CheckCircle2 className="w-4 h-4 text-[#10B981]" />, text: 'Completou o módulo', bold: 'JS Advanced' },
            { icon: <span className="text-xs">📝</span>, text: 'Fez o quiz semanal', bold: '' },
            { icon: <span className="text-xs">🔁</span>, text: 'Revisou', bold: 'HTML Basics' },
            { icon: <span className="text-xs">⚡</span>, text: 'Concluiu 2 desafios', bold: '' },
          ].map((a, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="mt-0.5 shrink-0">{a.icon}</span>
              <span className="text-[#94A3B8] text-xs leading-relaxed">
                {a.text} {a.bold && <span className="text-white font-semibold">{a.bold}</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
