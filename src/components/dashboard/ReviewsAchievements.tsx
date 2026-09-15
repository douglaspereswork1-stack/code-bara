import Link from 'next/link'
import { Clock, ArrowRight, Trophy, Flame, Zap, FileText, GitBranch } from 'lucide-react'

function TechBadge({ label, bg, text }: { label: string; bg: string; text: string }) {
  return (
    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-black border ${bg} ${text}`}>
      {label}
    </div>
  )
}

export function SpacedReviews() {
  const items = [
    { icon: <Clock className="w-5 h-5 text-[#22D3EE]" />, bg: 'bg-[#22D3EE]/15 border-[#22D3EE]/20', label: 'Revisão' },
    { icon: <TechBadge label="JS" bg="bg-[#FACC15]/15 border-[#FACC15]/20" text="text-[#FACC15]" />, label: 'JavaScript' },
    { icon: <TechBadge label="5" bg="bg-[#F97316]/15 border-[#F97316]/20" text="text-[#F97316]" />, label: 'HTML' },
    { icon: <GitBranch className="w-5 h-5 text-[#F97316]" />, bg: 'bg-[#F97316]/10 border-[#F97316]/15', label: 'Git' },
  ]
  return (
    <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm tracking-wide">REVISÕES ESPAÇADAS</h3>
        <Link href="#" className="text-xs font-semibold text-[#3B82F6] hover:text-white flex items-center gap-1">Ver todas <ArrowRight className="w-3 h-3" /></Link>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#111A32] border border-white/[0.04]">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${it.bg}`}>{it.icon}</div>
            <span className="text-xs text-[#94A3B8]">{it.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {[
          { lesson: 'JS Basics — Variáveis', type: 'D+1', due: 'Amanhã' },
          { lesson: 'HTML Basics — Semântica', type: 'D+3', due: 'Em 3 dias' },
          { lesson: 'Git — Branches', type: 'D+7', due: 'Em 8 dias' },
        ].map((r) => (
          <div key={r.lesson} className="flex items-center justify-between py-2 text-xs border-b border-white/[0.04] last:border-0">
            <span className="text-white">{r.lesson}</span>
            <span className="text-[#64748B]">{r.type} • {r.due}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RecentAchievements() {
  const badges = [
    { icon: Trophy, name: 'Conquistas', color: 'text-[#FACC15]', bg: 'bg-[#FACC15]/10 border-[#FACC15]/15' },
    { icon: Flame, name: 'Streak', color: 'text-[#F97316]', bg: 'bg-[#F97316]/10 border-[#F97316]/15' },
    { icon: Zap, name: 'Desafios', color: 'text-[#FACC15]', bg: 'bg-[#FACC15]/10 border-[#FACC15]/15' },
    { icon: FileText, name: 'Código Limpo', color: 'text-[#22D3EE]', bg: 'bg-[#22D3EE]/10 border-[#22D3EE]/15' },
  ]
  return (
    <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm tracking-wide">CONQUISTAS RECENTES</h3>
        <Link href="#" className="text-xs font-semibold text-[#3B82F6] hover:text-white flex items-center gap-1">Ver todas <ArrowRight className="w-3 h-3" /></Link>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-3">
        {badges.map((b) => (
          <div key={b.name} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-[#111A32] border border-white/[0.04] hover:border-white/[0.08] transition">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${b.bg}`}>
              <b.icon className={`w-5 h-5 ${b.color}`} />
            </div>
            <span className="text-xs text-[#94A3B8] text-center leading-tight">{b.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
