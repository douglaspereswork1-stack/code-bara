import { Trophy } from 'lucide-react'

export default function RankingsPage() {
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2"><Trophy className="w-6 h-6 text-[#FACC15]" /> Rankings</h1>
        <p className="text-sm text-[#94A3B8]">Semana atual — baseado em XP + streak.</p>
      </div>
      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-12 text-center">
        <Trophy className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
        <p className="text-sm text-[#94A3B8]">Ranking ainda não disponível.</p>
        <p className="text-xs text-[#64748B] mt-1">Complete aulas pra subir no ranking.</p>
      </div>
    </div>
  )
}