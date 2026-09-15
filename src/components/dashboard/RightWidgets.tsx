import Link from 'next/link'
import { CheckCircle, BookOpen, ClipboardCheck, Code2, GitBranch, PlayCircle } from 'lucide-react'

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
        <h3 className="font-semibold text-white text-sm tracking-wide">ATIVIDADE RECENTE</h3>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {[
            { icon: CheckCircle, label: 'Módulo\nconcluído', color: 'text-[#10B981]', bg: 'bg-[#10B981]/10 border-[#10B981]/20' },
            { icon: BookOpen, label: 'Aula\nassistida', color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10 border-[#8B5CF6]/20' },
            { icon: ClipboardCheck, label: 'Quiz\nrealizado', color: 'text-[#22D3EE]', bg: 'bg-[#22D3EE]/10 border-[#22D3EE]/20' },
            { icon: Code2, label: 'Desafio\nconcluído', color: 'text-[#3B82F6]', bg: 'bg-[#3B82F6]/10 border-[#3B82F6]/20' },
            { icon: GitBranch, label: 'Código\nenviado', color: 'text-[#8B5CF6]', bg: 'bg-[#8B5CF6]/10 border-[#8B5CF6]/20' },
          ].map((a) => (
            <div key={a.label} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${a.bg}`}>
                <a.icon className={`w-5 h-5 ${a.color}`} />
              </div>
              <span className="text-[10px] text-[#94A3B8] text-center whitespace-pre leading-tight">{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
