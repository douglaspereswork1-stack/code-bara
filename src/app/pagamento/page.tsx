"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Lock, Zap, Code2, Users, BookOpen, Trophy, CheckCircle, CreditCard, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PagamentoPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { data: session } = useSession()

  // Quem chega aqui com cookie velho mas já pagou (webhook processou depois do
  // redirect do MP) não pode ver "pague de novo": a sessão fresca diz isPaid=true.
  useEffect(() => {
    if ((session?.user as { isPaid?: boolean } | undefined)?.isPaid) router.replace('/dashboard')
  }, [session, router])

  async function handlePay() {
    setLoading(true)
    try {
      const res = await fetch('/api/payment/create', { method: 'POST' })
      const data = await res.json()
      if (data.init_point) {
        window.location.href = data.init_point
      } else {
        alert(data.error || 'Erro ao criar pagamento')
        setLoading(false)
      }
    } catch {
      alert('Erro ao conectar com Mercado Pago')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050914] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* voltar */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-white mb-8 transition">
          <ArrowLeft className="w-4 h-4" /> Voltar pra home
        </Link>

        {/* card principal */}
        <div className="rounded-3xl bg-[#0D1528] border border-white/[0.08] overflow-hidden">
          {/* header */}
          <div className="p-8 text-center border-b border-white/[0.06]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-black text-white">Desbloqueie o Code.Zen</h1>
            <p className="text-sm text-[#94A3B8] mt-2">Acesso vitalício a toda a plataforma</p>
          </div>

          {/* preço */}
          <div className="p-8 text-center border-b border-white/[0.06]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FACC15]/15 border border-[#FACC15]/40 text-[#FACC15] text-[11px] font-bold uppercase tracking-wide">
              🔥 Promoção de lançamento
            </span>
            <div className="mt-3 flex items-end justify-center gap-1.5">
              <span className="text-2xl font-black text-[#FACC15] leading-none mb-1">12x</span>
              <span className="text-5xl font-black text-white leading-none">R$ 75</span>
            </div>
            <p className="text-sm text-[#94A3B8] mt-2">no cartão • ou <span className="text-white font-semibold">R$ 899,99</span> no Pix</p>
            <p className="text-xs text-[#64748B] mt-1">Pagamento único • Acesso vitalício</p>
          </div>

          {/* features */}
          <div className="p-8 space-y-3">
            {[
              { icon: BookOpen, text: '25 módulos completos' },
              { icon: Code2, text: '433+ exercícios práticos' },
              { icon: Trophy, text: '8+ projetos reais' },
              { icon: Users, text: 'Suporte da comunidade' },
              { icon: Zap, text: '750h de conteúdo' },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
                <span className="text-sm text-[#94A3B8]">{f.text}</span>
              </div>
            ))}
          </div>

          {/* botão */}
          <div className="p-8 pt-0">
            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#8B5CF6] text-white font-bold text-lg flex items-center justify-center gap-3 hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Redirecionando...
                </span>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pagar com Mercado Pago
                </>
              )}
            </button>
            <p className="text-xs text-[#64748B] text-center mt-3">
              Pagamento seguro via Mercado Pago • PIX ou Cartão
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
