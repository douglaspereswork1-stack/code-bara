import type { LucideIcon } from 'lucide-react'

type Props = { index: string; title: string; text: string; icon: LucideIcon }

export function BenefitCard({ index, title, text, icon: Icon }: Props) {
  return (
    <li className="group relative rounded-2xl border border-white/[0.07] bg-[#0A1128]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#25E7F7]/30 hover:shadow-[0_20px_50px_-20px_rgba(37,231,247,0.35)]">
      <div className="flex items-start justify-between">
        <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#25E7F7]/15 to-[#8B5CF6]/20 border border-white/[0.06] flex items-center justify-center text-[#25E7F7]">
          <Icon className="w-5 h-5" aria-hidden />
        </span>
        <span className="text-xs font-bold text-[#64748B] tabular-nums">{index}</span>
      </div>
      <h3 className="mt-4 text-[13px] font-bold tracking-[0.14em] uppercase text-[#F8FAFC]">{title}</h3>
      <p className="mt-1.5 text-sm text-[#94A3B8] leading-relaxed">{text}</p>
    </li>
  )
}
