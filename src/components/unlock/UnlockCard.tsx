"use client"
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, KeyRound, Lock } from 'lucide-react'
import { PriceDisplay } from './PriceDisplay'
import { BenefitList } from './BenefitList'

type Props = { onPay: () => void; loading: boolean; error?: string | null }

export function UnlockCard({ onPay, loading, error }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.section
      aria-labelledby="unlock-title"
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
      className="relative w-full max-w-md rounded-3xl p-[1px] bg-gradient-to-b from-[#25E7F7]/50 via-[#4DA3FF]/20 to-[#8B5CF6]/40 shadow-[0_30px_80px_-30px_rgba(37,231,247,0.35)]"
    >
      <div className="rounded-[23px] bg-[#0A1128]/95 backdrop-blur-sm p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#25E7F7] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#4DA3FF]/30">
            <KeyRound className="w-5 h-5 text-[#050816]" aria-hidden />
          </span>
          <div>
            <h2 id="unlock-title" className="text-xs font-bold tracking-[0.2em] uppercase text-[#25E7F7]">Acesso completo</h2>
            <p className="text-sm text-[#94A3B8]">Desbloqueie toda a jornada Code.Zen.</p>
          </div>
        </div>

        <div className="mt-5">
          <PriceDisplay />
        </div>

        <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <BenefitList />

        <button
          type="button"
          onClick={onPay}
          disabled={loading}
          aria-label="Quero desbloquear agora — ir para o pagamento"
          aria-busy={loading}
          className="cz-breathe group mt-6 w-full h-14 rounded-2xl bg-gradient-to-r from-[#25E7F7] via-[#4DA3FF] to-[#8B5CF6] text-[#050816] font-black text-sm sm:text-base tracking-wide uppercase inline-flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.015] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8FAFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1128] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-[#050816]/30 border-t-[#050816] rounded-full animate-spin" aria-hidden />
              Redirecionando…
            </>
          ) : (
            <>
              Quero desbloquear agora
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
            </>
          )}
        </button>

        {error && <p role="alert" className="mt-3 text-xs text-[#FCA5A5] text-center">{error}</p>}

        <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#64748B]">
          <Lock className="w-3 h-3" aria-hidden /> Pagamento seguro via Mercado Pago
        </p>
      </div>
    </motion.section>
  )
}
