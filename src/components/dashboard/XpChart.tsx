'use client'

import { useEffect, useState } from 'react'

type Props = {
  currentXp: number
  level: number
}

export function XpChart({ currentXp, level }: Props) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const xpInLevel = currentXp % 500
  const xpForNext = 500
  const progress = Math.min((xpInLevel / xpForNext) * 100, 100)

  // Generate fake weekly data for chart
  const weekData = [120, 85, 200, 45, 160, 90, xpInLevel]
  const maxVal = Math.max(...weekData, 1)
  const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D']

  return (
    <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-white">Evolução XP</h3>
        <span className="text-xs text-[#94A3B8]">Nível {level}</span>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-2 h-24 mb-4">
        {weekData.map((val, i) => {
          const height = mounted ? (val / maxVal) * 100 : 0
          const isToday = i === weekData.length - 1
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative" style={{ height: '100%' }}>
                <div
                  className={`absolute bottom-0 w-full rounded-t transition-all duration-700 ${
                    isToday
                      ? 'bg-gradient-to-t from-[#22D3EE] to-[#3B82F6]'
                      : 'bg-white/[0.08]'
                  }`}
                  style={{ height: `${height}%`, transitionDelay: `${i * 80}ms` }}
                />
              </div>
              <span className={`text-[10px] ${isToday ? 'text-[#22D3EE] font-bold' : 'text-[#64748B]'}`}>{days[i]}</span>
            </div>
          )
        })}
      </div>

      {/* Level progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-[#94A3B8]">Nível {level}</span>
          <span className="text-[#FACC15] font-bold">{xpInLevel}/{xpForNext} XP</span>
        </div>
        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#FACC15] transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
