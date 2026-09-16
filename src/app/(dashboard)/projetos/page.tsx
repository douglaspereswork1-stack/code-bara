import { FolderKanban } from 'lucide-react'

export default function ProjetosPage() {
  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-white flex items-center gap-2"><FolderKanban className="w-6 h-6 text-[#8B5CF6]" /> Projetos</h1>
      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-12 text-center">
        <FolderKanban className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
        <p className="text-sm text-[#94A3B8]">Nenhum projeto disponível ainda.</p>
        <p className="text-xs text-[#64748B] mt-1">Projetos práticos serão liberados conforme você avança no curso.</p>
      </div>
    </div>
  )
}