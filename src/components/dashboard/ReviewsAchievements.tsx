import { Clock, Trophy } from 'lucide-react'

export function SpacedReviews() {
  return (
    <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm tracking-wide">REVISÕES ESPAÇADAS</h3>
      </div>
      <div className="mt-6 flex flex-col items-center text-center py-4">
        <Clock className="w-8 h-8 text-[#64748B] mb-2" />
        <p className="text-sm text-[#94A3B8]">Nenhuma revisão agendada.</p>
        <p className="text-xs text-[#64748B] mt-1">Complete aulas pra gerar revisões.</p>
      </div>
    </div>
  )
}

export function RecentAchievements() {
  return (
    <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm tracking-wide">CONQUISTAS RECENTES</h3>
      </div>
      <div className="mt-6 flex flex-col items-center text-center py-4">
        <Trophy className="w-8 h-8 text-[#64748B] mb-2" />
        <p className="text-sm text-[#94A3B8]">Nenhuma conquista ainda.</p>
        <p className="text-xs text-[#64748B] mt-1">Estude pra desbloquear conquistas.</p>
      </div>
    </div>
  )
}