import { Users, MessageCircle } from 'lucide-react'

export default function ComunidadePage() {
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-white flex items-center gap-2"><Users className="w-6 h-6 text-[#22D3EE]" /> Comunidade</h1>
      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22D3EE]/20 to-[#8B5CF6]/20 border border-white/[0.06] flex items-center justify-center mx-auto">
          <MessageCircle className="w-6 h-6 text-[#22D3EE]" />
        </div>
        <div className="font-semibold text-white mt-3">Em breve</div>
        <p className="text-sm text-[#94A3B8] mt-1">Feed, dúvidas e code review entre alunos — alcateia em construção.</p>
        <div className="mt-4 text-xs text-[#64748B]">Enquanto isso, use o Discord da turma.</div>
      </div>
    </div>
  )
}
