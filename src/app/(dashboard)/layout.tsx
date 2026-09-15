import { Sidebar } from '@/components/layout/Sidebar'
import { Topbar } from '@/components/layout/Topbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#050914]">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />
        <main className="flex-1">
          <div className="max-w-[1280px] mx-auto w-full">
            {children}
          </div>
        </main>
        {/* status bar */}
        <footer className="h-8 border-t border-white/[0.06] bg-[#0A1020] flex items-center justify-between px-4 lg:px-6 text-[11px] text-[#64748B]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,0.5)]" /> Code.Zen ● Online</span>
            <span className="hidden md:flex items-center gap-1.5">
              <span className="w-6 h-6 rounded bg-[#F97316] flex items-center justify-center text-[10px] font-black text-white">5</span> <span className="mr-1">HTML</span>
              <span className="w-6 h-6 rounded bg-[#3B82F6] flex items-center justify-center text-[10px] font-black text-white">3</span> <span className="mr-1">CSS</span>
              <span className="w-6 h-6 rounded bg-[#FACC15] flex items-center justify-center text-[10px] font-black text-black">JS</span> <span className="mr-1">JavaScript</span>
              <span className="w-6 h-6 rounded bg-[#F97316]/20 border border-[#F97316]/30 flex items-center justify-center"><span className="w-2 h-2 rotate-45 bg-[#F97316]" /></span> <span className="mr-1">Git</span>
              <span className="w-6 h-6 rounded-full bg-[#22D3EE]/15 border border-[#22D3EE]/20 flex items-center justify-center text-[10px]">⚛</span> <span className="mr-1">React</span>
              <span className="w-6 h-6 rounded bg-[#10B981]/15 border border-[#10B981]/20 flex items-center justify-center text-[10px] font-bold text-[#10B981]">⬢</span> Node.js
            </span>
          </div>
          <span className="hidden sm:flex items-center gap-2 font-medium tracking-wide">
            Aprender <span className="opacity-40">•</span> Construir <span className="opacity-40">•</span> Evoluir
          </span>
        </footer>
      </div>
    </div>
  )
}
