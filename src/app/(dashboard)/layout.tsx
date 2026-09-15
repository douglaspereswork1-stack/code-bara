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
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,0.5)]" /> DevFullStack ● Online</span>
            <span className="hidden md:flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06]">HTML</span>
              <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06]">CSS</span>
              <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06]">JS</span>
              <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06]">Git</span>
              <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06]">React</span>
              <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06]">Node</span>
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
