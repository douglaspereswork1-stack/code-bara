"use client"
import { motion, useReducedMotion } from 'framer-motion'
import { BookOpen, Brain, Code2, Cog, Rocket, Crown, Lock } from 'lucide-react'

type Step = { label: string; icon: typeof BookOpen; state: 'open' | 'dim' | 'locked' | 'final' }

const STEPS: Step[] = [
  { label: 'Fundamentos', icon: BookOpen, state: 'open' },
  { label: 'Lógica de programação', icon: Brain, state: 'open' },
  { label: 'Front-end', icon: Code2, state: 'dim' },
  { label: 'Back-end', icon: Cog, state: 'locked' },
  { label: 'Projetos reais', icon: Rocket, state: 'locked' },
  { label: 'Full Stack Developer', icon: Crown, state: 'final' },
]

const RING: Record<Step['state'], string> = {
  open: 'border-[#25E7F7]/70 bg-[#25E7F7]/15 text-[#25E7F7] shadow-[0_0_18px_rgba(37,231,247,0.35)]',
  dim: 'border-[#4DA3FF]/40 bg-[#4DA3FF]/10 text-[#4DA3FF]/80',
  locked: 'border-white/10 bg-white/[0.03] text-[#64748B]',
  final: 'border-[#F8FAFC]/60 bg-gradient-to-br from-[#25E7F7]/30 to-[#8B5CF6]/40 text-[#F8FAFC] shadow-[0_0_34px_rgba(139,92,246,0.55)]',
}

export function LearningPath({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion()

  if (compact) {
    return (
      <ol aria-label="Trilha de evolução" className="flex items-center justify-between gap-1 w-full max-w-md mx-auto">
        {STEPS.map((s, i) => {
          const Icon = s.state === 'locked' ? Lock : s.icon
          return (
            <li key={s.label} className="flex items-center flex-1 last:flex-none">
              <span title={s.label} className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${RING[s.state]}`}>
                <Icon className="w-4 h-4" aria-hidden />
                <span className="sr-only">{s.label}</span>
              </span>
              {i < STEPS.length - 1 && <span className="h-px flex-1 mx-1 bg-gradient-to-r from-[#25E7F7]/50 to-white/10" aria-hidden />}
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <motion.ol
      aria-label="Trilha de evolução"
      initial={reduce ? false : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="relative space-y-3.5"
    >
      {/* linha da trilha + luz percorrendo */}
      <span aria-hidden className="absolute left-[21px] top-5 bottom-5 w-px bg-gradient-to-b from-[#25E7F7]/60 via-[#4DA3FF]/25 to-[#8B5CF6]/60 overflow-hidden">
        <span className="cz-path-light absolute left-0 w-px h-[20%] bg-gradient-to-b from-transparent via-[#F8FAFC] to-transparent" />
      </span>
      {STEPS.map((s) => {
        const Icon = s.state === 'locked' ? Lock : s.icon
        const isFinal = s.state === 'final'
        return (
          <li key={s.label} className="relative flex items-center gap-3">
            <span className={`relative z-10 w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${RING[s.state]}`}>
              <Icon className="w-[18px] h-[18px]" aria-hidden />
            </span>
            <span className={`text-[13px] font-semibold tracking-wide uppercase ${isFinal ? 'text-[#F8FAFC]' : s.state === 'locked' ? 'text-[#64748B]' : 'text-[#CBD5E1]'}`}>
              {s.label}
              {isFinal && <span className="block text-[10px] font-medium normal-case tracking-normal text-[#25E7F7]">Sua jornada completa</span>}
            </span>
          </li>
        )
      })}
    </motion.ol>
  )
}
