import { Code2 } from 'lucide-react'

export default function DesafiosPage() {
  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2"><Code2 className="w-6 h-6 text-[#22D3EE]" /> Desafios</h1>
        <p className="text-sm text-[#94A3B8]">Pratique com problemas reais — ganhe XP e suba no ranking.</p>
      </div>
      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-12 text-center">
        <Code2 className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
        <p className="text-sm text-[#94A3B8]">Nenhum desafio disponível ainda.</p>
        <p className="text-xs text-[#64748B] mt-1">Em breve teremos desafios pra praticar.</p>
      </div>
    </div>
  )
}