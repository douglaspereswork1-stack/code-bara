"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion, useReducedMotion } from 'framer-motion'
import { PremiumHeader } from './PremiumHeader'
import { HeroSection } from './HeroSection'
import { ExperienceSection } from './ExperienceSection'
import { FinalCTA } from './FinalCTA'

// Página /pagamento. A ÚNICA integração é POST /api/payment/create → { init_point }
// (Preference do Mercado Pago). Mesma lógica da versão anterior da página.
export function UnlockPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { data: session } = useSession()
  const reduce = useReducedMotion()

  // Quem chega com cookie velho mas já pagou (webhook processou depois do redirect do MP)
  useEffect(() => {
    if (session?.user?.isPaid) router.replace('/dashboard')
  }, [session, router])

  async function handlePay() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/payment/create', { method: 'POST' })
      const data = await res.json()
      if (res.status === 401) {
        router.push('/login?callbackUrl=/pagamento')
        return
      }
      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        setError(data.error || 'Não foi possível iniciar o pagamento. Tente de novo.')
        setLoading(false)
      }
    } catch {
      setError('Sem conexão com o Mercado Pago. Tente de novo em instantes.')
      setLoading(false)
    }
  }

  return (
    <motion.main
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen overflow-x-hidden bg-[#050816] text-[#F8FAFC]"
    >
      {/* iluminação ambiente do fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_70%_-10%,#24105A_0%,transparent_60%),radial-gradient(900px_500px_at_-10%_30%,#08152D_0%,transparent_60%),radial-gradient(800px_500px_at_50%_100%,#151047_0%,transparent_60%)]" />
      </div>
      <PremiumHeader />
      <HeroSection onPay={handlePay} loading={loading} error={error} />
      <ExperienceSection />
      <FinalCTA onPay={handlePay} loading={loading} />
    </motion.main>
  )
}
