"use client"
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { UserRound } from 'lucide-react'

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const t = size === 'sm' ? 'text-lg' : 'text-xl'
  return (
    <Link href="/" aria-label="Code.Zen — início" className={`inline-flex items-center gap-2 font-black ${t} tracking-tight`}>
      <span className="text-[#25E7F7] drop-shadow-[0_0_10px_rgba(37,231,247,0.75)]">{'</>'}</span>
      <span className="text-[#F8FAFC]">Code<span className="bg-gradient-to-r from-[#25E7F7] to-[#8B5CF6] bg-clip-text text-transparent">.Zen</span></span>
    </Link>
  )
}

export function PremiumHeader() {
  const reduce = useReducedMotion()
  return (
    <motion.header
      initial={reduce ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-20 max-w-7xl mx-auto w-full px-5 lg:px-8 h-16 flex items-center justify-between"
    >
      <div className="flex items-center gap-5">
        <Logo />
        <span className="hidden md:inline text-[11px] font-semibold tracking-[0.22em] uppercase text-[#94A3B8]">Aprenda · Crie · Evolua</span>
      </div>
      <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-[#94A3B8] hover:text-white transition rounded-lg px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25E7F7]">
        <UserRound className="w-4 h-4" aria-hidden /> <span className="hidden sm:inline">Já sou aluno</span>
      </Link>
    </motion.header>
  )
}
