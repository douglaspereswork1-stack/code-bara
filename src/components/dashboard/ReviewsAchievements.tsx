import Link from 'next/link'
import { Clock, ArrowRight } from 'lucide-react'

const reviews = [
  { lesson: 'JS Basics — Variáveis', type: 'D+1', due: 'Amanhã' },
  { lesson: 'HTML Basics — Semântica', type: 'D+3', due: 'Em 3 dias' },
  { lesson: 'Git — Branches', type: 'D+7', due: 'Em 8 dias' },
]

export function SpacedReviews() {
  return (
    <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6">
      <h3 className="font-semibold text-white flex items-center gap-2">
        <Clock className="w-4 h-4 text-[#22D3EE]" /> Revisões Espaçadas
      </h3>
      <div className="mt-4 space-y-3">
        {reviews.map((r) => (
          <div key={r.lesson} className="flex items-center justify-between p-3 rounded-xl bg-[#111A32] border border-white/[0.04] hover:border-white/[0.08] transition">
            <div>
              <div className="text-sm font-medium text-white">{r.lesson}</div>
              <div className="text-xs text-[#64748B]">{r.type}</div>
            </div>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/[0.06] text-[#94A3B8] border border-white/[0.06]">{r.due}</span>
          </div>
        ))}
      </div>
      <Link href="#" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE] hover:text-white transition">
        Ver todas <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  )
}

export function RecentAchievements() {
  const badges = [
    { icon: '🔥', name: 'Fogo Aceso', desc: '7 dias seguidos', color: 'from-[#F97316]/20 to-transparent border-[#F97316]/20' },
    { icon: '⚡', name: 'Code Warrior', desc: '50 exercícios', color: 'from-[#8B5CF6]/15 to-transparent border-[#8B5CF6]/20' },
    { icon: '📄', name: 'Código Limpo', desc: '10 submissões sem erro', color: 'from-[#10B981]/15 to-transparent border-[#10B981]/20' },
  ]
  return (
    <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6">
      <h3 className="font-semibold text-white flex items-center gap-2">🏆 Conquistas Recentes</h3>
      <div className="mt-4 space-y-3">
        {badges.map((b) => (
          <div key={b.name} className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${b.color} border`}>
            <span className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-lg shrink-0">{b.icon}</span>
            <div>
              <div className="text-sm font-semibold text-white">{b.name}</div>
              <div className="text-xs text-[#94A3B8]">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <Link href="#" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE] hover:text-white transition">
        Ver todas <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  )
}
