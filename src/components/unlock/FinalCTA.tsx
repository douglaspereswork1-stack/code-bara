"use client"
import { ArrowRight, Lock } from 'lucide-react'

type Props = { onPay: () => void; loading: boolean }

export function FinalCTA({ onPay, loading }: Props) {
  return (
    <section aria-labelledby="final-title" className="relative z-10 max-w-7xl mx-auto w-full px-5 lg:px-8 pb-20 lg:pb-28">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#08152D] via-[#16113B] to-[#08152D] px-6 py-12 sm:px-12 sm:py-16 text-center">
        <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#25E7F7]/10 blur-3xl" />
        <div aria-hidden className="absolute -bottom-32 right-0 w-[380px] h-[380px] rounded-full bg-[#8B5CF6]/15 blur-3xl" />
        <h2 id="final-title" className="relative text-3xl sm:text-4xl font-black tracking-tight text-[#F8FAFC]">
          Sua jornada Full Stack começa <span className="bg-gradient-to-r from-[#25E7F7] to-[#8B5CF6] bg-clip-text text-transparent">agora.</span>
        </h2>
        <p className="relative mt-3 text-[#94A3B8]">
          <span className="text-[#F8FAFC] font-bold">12x de R$ 75</span> ou R$ 899,99 no Pix • Pagamento único • Acesso vitalício
        </p>
        <button
          type="button"
          onClick={onPay}
          disabled={loading}
          aria-label="Quero desbloquear agora — ir para o pagamento"
          className="cz-breathe group relative mt-8 h-14 px-5 sm:px-8 w-full sm:w-auto rounded-2xl bg-gradient-to-r from-[#25E7F7] via-[#4DA3FF] to-[#8B5CF6] text-[#050816] font-black text-[13px] sm:text-base whitespace-nowrap uppercase tracking-wide inline-flex items-center justify-center gap-2 transition-transform duration-200 hover:scale-[1.015] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8FAFC] disabled:opacity-60"
        >
          {loading ? 'Redirecionando…' : 'Quero desbloquear agora'}
          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
        </button>
        <p className="relative mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#64748B]">
          <Lock className="w-3 h-3" aria-hidden /> Pagamento seguro via Mercado Pago
        </p>
      </div>
    </section>
  )
}
