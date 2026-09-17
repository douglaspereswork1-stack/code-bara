"use client"
import { motion, useReducedMotion } from 'framer-motion'
import { MascotScene } from './MascotScene'
import { LearningPath } from './LearningPath'
import { UnlockCard } from './UnlockCard'

type Props = { onPay: () => void; loading: boolean; error?: string | null }

export function HeroSection({ onPay, loading, error }: Props) {
  const reduce = useReducedMotion()
  const up = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  })

  return (
    <section className="relative z-10 max-w-7xl mx-auto w-full px-5 lg:px-8 pt-4 pb-16 lg:pt-6 lg:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-start">
        {/* COPY — mobile 1º; desktop coluna esquerda (com o card embaixo) */}
        <div className="order-1 lg:col-span-5">
          <motion.h1 {...up(0.1)} className="text-[44px] leading-[0.95] sm:text-6xl lg:text-[56px] xl:text-[64px] font-black tracking-tight text-[#F8FAFC]">
            Desbloqueie<br />seu futuro<br />
            <span className="bg-gradient-to-r from-[#25E7F7] via-[#4DA3FF] to-[#8B5CF6] bg-clip-text text-transparent">com código.</span>
          </motion.h1>
          <motion.p {...up(0.2)} className="mt-5 text-lg text-[#CBD5E1] max-w-md">
            Do zero ao Full Stack, com uma jornada prática, divertida e recompensadora.
          </motion.p>
          <motion.p {...up(0.26)} className="mt-2 text-sm text-[#94A3B8] max-w-md">
            Aprenda no seu ritmo, construa projetos reais e evolua passo a passo.
          </motion.p>
          <div className="hidden lg:block mt-6">
            <UnlockCard onPay={onPay} loading={loading} error={error} />
          </div>
        </div>

        {/* CENA — mobile 2º; desktop coluna direita, trilha ao lado em xl */}
        <div className="order-2 lg:col-span-7 lg:pt-4">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-6 items-center">
            <MascotScene />
            <div className="hidden xl:block pr-2">
              <LearningPath />
            </div>
          </div>
          <div className="xl:hidden mt-6">
            <LearningPath compact />
          </div>
        </div>

        {/* CARD — mobile/tablet 3º (depois da cena e da trilha resumida) */}
        <div className="order-3 lg:hidden flex justify-center">
          <UnlockCard onPay={onPay} loading={loading} error={error} />
        </div>
      </div>
    </section>
  )
}
