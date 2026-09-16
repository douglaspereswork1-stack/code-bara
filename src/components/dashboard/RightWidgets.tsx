import Link from 'next/link'
import { PlayCircle } from 'lucide-react'

export function RightWidgets() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-gradient-to-br from-[#0D1528] to-[#111A32] border border-white/[0.06] p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 to-[#8B5CF6]/10 pointer-events-none" />
        <div className="relative">
          <h3 className="font-bold text-white leading-tight">Grandes desenvolvedores<br />nunca param.</h3>
          <p className="text-xs text-[#94A3B8] mt-2">Estudo de hoje,<br />oportunidades de amanhã.</p>
          <Link href="/curso/dev-fullstack" className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-sm font-semibold shadow-lg shadow-[#3B82F6]/20 hover:brightness-110 transition">
            <PlayCircle className="w-4 h-4" /> Continuar estudos
          </Link>
        </div>
      </div>
    </div>
  )
}