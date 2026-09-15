"use client"
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function PagamentoSucesso() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050914] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
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
      </motion.div>
    </div>
  )
}
