import { FolderKanban, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const projects = [
  { title: 'Landing Page — HTML/CSS', desc: 'Módulo 02 • Projeto guiado', status: 'Concluído', href: '/curso/dev-fullstack' },
  { title: 'API de Tarefas — Node/Express', desc: 'Módulo 05 • Projeto final', status: 'Em andamento', href: '/curso/dev-fullstack' },
  { title: 'Clone Duolingo — React', desc: 'Desafio extra', status: 'Bloqueado', href: '#' },
]

export default function ProjetosPage() {
  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-white flex items-center gap-2"><FolderKanban className="w-6 h-6 text-[#8B5CF6]" /> Projetos</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map(p => (
          <div key={p.title} className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-5">
            <div className="text-sm font-bold text-white">{p.title}</div>
            <div className="text-xs text-[#94A3B8] mt-1">{p.desc}</div>
            <div className="mt-3 flex items-center justify-between">
              <span className={`text-[11px] font-bold px-2 py-1 rounded-full border ${p.status==='Concluído'?'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20':p.status==='Em andamento'?'bg-[#22D3EE]/10 text-[#22D3EE] border-[#22D3EE]/20':'bg-white/[0.06] text-[#64748B] border-white/[0.06]'}`}>{p.status}</span>
              <Link href={p.href} className="text-xs font-semibold text-[#22D3EE] hover:text-white flex items-center gap-1">Abrir <ExternalLink className="w-3 h-3" /></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
