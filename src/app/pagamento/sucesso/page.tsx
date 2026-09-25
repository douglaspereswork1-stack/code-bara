"use client"
import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'

// O Mercado Pago redireciona pra cá ANTES do webhook marcar isPaid no banco.
// Enquanto o cookie da sessão disser isPaid=false, o middleware devolve /dashboard
// pra /pagamento. Então a página fica em "confirmando" e força update() da sessão
// (roda o callback jwt, que reconsulta o banco e reescreve o cookie) até virar true.
const POLL_MS = 3000
const POLL_MAX = 40 // ~2 min

export default function PagamentoSucesso() {
  const { data: session, status, update } = useSession()
  const isPaid = Boolean(session?.user?.isPaid)
  const tries = useRef(0)
  const [timedOut, setTimedOut] = useState(false)

  useEffect(() => {
    if (status !== 'authenticated' || isPaid) return
    const id = setInterval(() => {
      tries.current += 1
      if (tries.current > POLL_MAX) { clearInterval(id); setTimedOut(true); return }
      update()
    }, POLL_MS)
    return () => clearInterval(id)
  }, [status, isPaid, update])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050914] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        {isPaid ? (
          <>
            <div className="w-20 h-20 rounded-full bg-[#10B981]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#10B981]" />
            </div>
            <h1 className="text-3xl font-black text-white">Pagamento confirmado!</h1>
            <p className="text-[#94A3B8] mt-3">
              Seu acesso vitalício ao Code.Zen foi liberado. Bora programar!
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#8B5CF6] text-white font-bold hover:brightness-110 transition"
            >
              Acessar plataforma <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-[#22D3EE]/20 flex items-center justify-center mx-auto mb-6">
              <Loader2 className="w-10 h-10 text-[#22D3EE] animate-spin" />
            </div>
            <h1 className="text-3xl font-black text-white">Confirmando pagamento…</h1>
            <p className="text-[#94A3B8] mt-3">
              {timedOut
                ? 'Está demorando mais que o normal. Seu pagamento está seguro — recarregue a página em alguns minutos ou fale com a gente.'
                : 'Recebemos o retorno do Mercado Pago. Liberando seu acesso, isso leva poucos segundos.'}
            </p>
          </>
        )}
      </motion.div>
    </div>
  )
}
