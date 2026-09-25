"use client"
import { useSession } from 'next-auth/react'
import { Rocket, Flame } from 'lucide-react'

export function WelcomeBanner() {
  const { data: session } = useSession()
  const name = session?.user?.name?.split(' ')[0] || 'Aluno'

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#22D3EE]/20 bg-gradient-to-br from-[#0D1528] via-[#0F1B3A] to-[#1A1040] p-6 md:p-7">
      {/* glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#3B82F6]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#8B5CF6]/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#22D3EE]/[0.04] via-transparent to-[#8B5CF6]/[0.04] pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        {/* left illustration */}
        <div className="hidden md:flex w-14 h-14 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#3B82F6] items-center justify-center shrink-0 shadow-lg shadow-[#3B82F6]/20">
          <Rocket className="w-7 h-7 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            E aí, {name} dev? <span className="inline-block">🚀</span>
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">Cada linha de código te aproxima do seu próximo nível.</p>
          <p className="text-sm font-medium text-white mt-1 flex items-center gap-1.5">
            Vamos manter o streak? <Flame className="w-4 h-4 text-[#F97316]" />
          </p>
        </div>

        {/* right motivational mini-card */}
        <div className="hidden lg:block shrink-0 w-[240px] rounded-xl bg-white/[0.06] backdrop-blur border border-white/[0.08] p-4">
          <p className="text-xs font-semibold text-white">Grandes devs nunca param.</p>
          <p className="text-xs text-[#94A3B8] mt-1">Estudo de hoje, oportunidades de amanhã.</p>
          <a href="/curso/dev-fullstack" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#22D3EE] hover:text-white transition">
            ▶ Ver próximos cursos
          </a>
        </div>
      </div>
    </div>
  )
}
