"use client"
import { motion } from 'framer-motion'
import { Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PagamentoPendente() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050914] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 rounded-full bg-[#FACC15]/20 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-[#FACC15]" />
        </div>
        <h1 className="text-3xl font-black text-white">Pagamento pendente</h1>
        <p className="text-[#94A3B8] mt-3">
          Seu pagamento está sendo processado. Assim que confirmar, seu acesso será liberado automaticamente.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:bg-white/[0.06] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar pra home
        </Link>
      </motion.div>
    </div>
  )
}
