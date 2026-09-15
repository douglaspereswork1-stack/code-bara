"use client"
import { useState } from 'react'
import { Search, Bell, Sun, Moon, ChevronDown, LogOut } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export function Topbar() {
  const { data: session } = useSession()
  const [q, setQ] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const name = (session?.user?.name as string) || 'Douglas'
  const email = (session?.user?.email as string) || ''
  const initial = name.charAt(0).toUpperCase()

  return (
    <header className="h-[64px] sticky top-0 z-20 bg-[#050914]/80 backdrop-blur-xl border-b border-white/[0.06] flex items-center gap-4 px-4 lg:px-6">
      {/* search */}
      <div className="flex-1 max-w-[560px] hidden md:flex">
        <label className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] group-focus-within:text-[#22D3EE] transition" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar cursos, desafios, aulas..."
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#0D1528] border border-white/[0.06] text-sm text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#22D3EE]/40 focus:ring-2 focus:ring-[#22D3EE]/20 transition"
            aria-label="Buscar"
          />
        </label>
      </div>

      <div className="flex-1 md:hidden" />

      {/* actions */}
      <div className="flex items-center gap-2">
        <button
          aria-label="Notificações"
          className="w-9 h-9 rounded-xl bg-[#0D1528] border border-white/[0.06] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-white/10 transition relative"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F97316] border-2 border-[#050914]" />
        </button>

        <button
          aria-label="Alternar tema"
          className="w-9 h-9 rounded-xl bg-[#0D1528] border border-white/[0.06] hidden sm:flex items-center justify-center text-[#94A3B8] hover:text-white transition"
          title="Tema"
          onClick={() => {}}
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* avatar */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full bg-[#0D1528] border border-white/[0.06] hover:border-white/10 transition"
            aria-label="Menu do usuário"
            aria-expanded={menuOpen}
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] flex items-center justify-center text-sm font-bold text-white">
              {initial}
            </span>
            <span className="hidden sm:flex flex-col text-left leading-none">
              <span className="text-sm font-semibold text-white">{name}</span>
              <span className="text-[11px] text-[#10B981] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,0.6)]" /> Online
              </span>
            </span>
            <ChevronDown className={`w-4 h-4 text-[#64748B] transition ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-xl bg-[#0D1528] border border-white/10 shadow-xl overflow-hidden z-50">
              <div className="p-3 border-b border-white/[0.06]">
                <div className="text-sm font-semibold text-white">{name}</div>
                <div className="text-xs text-[#94A3B8] truncate">{email}</div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition"
              >
                <LogOut className="w-4 h-4" /> Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
