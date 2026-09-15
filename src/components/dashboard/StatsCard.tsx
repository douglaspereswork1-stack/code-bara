import type { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  label: string
  value: string | number
  sublabel: string
  accent: 'orange' | 'violet' | 'cyan' | 'green'
  trend?: string
  progress?: number // 0-100 for bar
  ring?: number // 0-100 for circular
}

const accentMap = {
  orange: { bg: 'bg-[#F97316]/10', text: 'text-[#F97316]', bar: 'from-[#F97316] to-[#FB923C]', ring: '#F97316' },
  violet: { bg: 'bg-[#8B5CF6]/10', text: 'text-[#8B5CF6]', bar: 'from-[#8B5CF6] to-[#A78BFA]', ring: '#8B5CF6' },
  cyan: { bg: 'bg-[#22D3EE]/10', text: 'text-[#22D3EE]', bar: 'from-[#22D3EE] to-[#3B82F6]', ring: '#22D3EE' },
  green: { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', bar: 'from-[#10B981] to-[#34D399]', ring: '#10B981' },
}

export function StatsCard({ icon, label, value, sublabel, accent, trend, progress, ring }: Props) {
  const a = accentMap[accent]
  return (
    <div className="group relative rounded-2xl bg-[#0D1528] border border-white/[0.06] p-5 overflow-hidden hover:border-white/10 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 transition-all duration-200">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/[0.03] to-transparent transition" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className={`w-9 h-9 rounded-xl ${a.bg} border border-white/[0.06] flex items-center justify-center ${a.text}`}>
            {icon}
          </div>
          {trend && (
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${a.bg} ${a.text} border border-white/5`}>{trend}</span>
          )}
          {typeof ring === 'number' && (
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90">
                <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.08)" strokeWidth="3" fill="none" />
                <circle
                  cx="20" cy="20" r="16"
                  stroke={a.ring}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${(ring / 100) * 100.5} 100.5`}
                  style={{ filter: `drop-shadow(0 0 6px ${a.ring}66)` }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">{ring}%</span>
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-[#64748B]">{label}</div>
          <div className="text-3xl font-black text-white tracking-tight mt-1">{value}</div>
          <div className="text-xs text-[#94A3B8] mt-1">{sublabel}</div>
        </div>

        {typeof progress === 'number' && (
          <div className="mt-4 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${a.bar} transition-all duration-700`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
