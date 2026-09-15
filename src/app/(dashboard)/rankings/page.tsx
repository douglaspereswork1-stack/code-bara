import { Trophy, Medal, Crown } from 'lucide-react'

const rows = [
  { pos: 1, name: 'Ana Silva', xp: 8420, streak: 47 },
  { pos: 2, name: 'Douglas', xp: 2450, streak: 12, me: true },
  { pos: 3, name: 'Marcos Dev', xp: 2310, streak: 9 },
  { pos: 4, name: 'Julia Code', xp: 1980, streak: 15 },
  { pos: 5, name: 'Rafa Frontend', xp: 1820, streak: 6 },
]

export default function RankingsPage() {
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2"><Trophy className="w-6 h-6 text-[#FACC15]" /> Rankings</h1>
        <p className="text-sm text-[#94A3B8]">Semana atual — baseado em XP + streak.</p>
      </div>
      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] overflow-hidden">
        {rows.map(r => (
          <div key={r.pos} className={`flex items-center gap-4 px-5 py-4 border-b border-white/[0.04] last:border-0 ${r.me ? 'bg-gradient-to-r from-[#3B82F6]/10 to-transparent' : ''}`}>
            <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black ${r.pos===1?'bg-[#FACC15] text-black':r.pos===2?'bg-white/10 text-white':r.pos===3?'bg-[#F97316]/20 text-[#F97316]':'bg-white/[0.06] text-[#94A3B8]'}`}>
              {r.pos===1 ? <Crown className="w-4 h-4" /> : r.pos}
            </span>
            <div className="flex-1">
              <div className={`text-sm font-semibold ${r.me?'text-white':'text-white'}`}>{r.name} {r.me && <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#3B82F6] text-white ml-1">você</span>}</div>
              <div className="text-xs text-[#64748B]">{r.streak} dias streak</div>
            </div>
            <div className="text-sm font-black text-white">{r.xp.toLocaleString('pt-BR')} XP</div>
          </div>
        ))}
      </div>
    </div>
  )
}
