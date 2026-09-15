"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  BookOpen,
  Code2,
  Trophy,
  FolderKanban,
  Users,
  Settings,
  Menu,
  X,
} from 'lucide-react'

const mainNav = [
  { href: '/dashboard', label: 'Início', icon: LayoutDashboard },
  { href: '/curso/dev-fullstack', label: 'Cursos', icon: BookOpen },
  { href: '/desafios', label: 'Desafios', icon: Code2 },
  { href: '/rankings', label: 'Rankings', icon: Trophy },
  { href: '/projetos', label: 'Projetos', icon: FolderKanban },
  { href: '/comunidade', label: 'Comunidade', icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const Nav = (
    <nav className="flex-1 py-4 space-y-1 px-3">
      {mainNav.map((item) => {
        const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
              ${active
                ? 'text-white bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] shadow-lg shadow-[#3B82F6]/20'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'
              }`}
            aria-current={active ? 'page' : undefined}
          >
            {active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-[#22D3EE] shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
            )}
            <item.icon className={`w-[18px] h-[18px] shrink-0 ${active ? 'text-white' : 'text-[#64748B] group-hover:text-white'}`} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-xl bg-[#0D1528] border border-white/10 text-white"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* overlay */}
      {open && (
        <button
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-[272px] shrink-0 flex flex-col bg-[#0A1020] border-r border-white/[0.06] transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* logo */}
        <div className="h-[64px] flex items-center gap-3 px-5 border-b border-white/[0.06] shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#3B82F6] flex items-center justify-center shadow-lg shadow-[#3B82F6]/20">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-white">DevFullStack</span>
            <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white">PRO</span>
          </div>
        </div>

        {Nav}

        {/* motivational */}
        <div className="mx-3 mb-3 p-4 rounded-xl bg-gradient-to-br from-[#0D1528] to-[#111A32] border border-white/[0.06] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/[0.06] to-[#8B5CF6]/[0.06] pointer-events-none" />
          <div className="relative">
            <p className="text-xs font-mono text-[#22D3EE]">&lt;/&gt; Código hoje.</p>
            <p className="text-xs font-semibold text-white">Liberdade amanhã.</p>
            <p className="text-[11px] text-[#64748B] mt-1">Constância &gt; intensidade</p>
          </div>
        </div>

        <div className="px-3 pb-4">
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${pathname === '/settings' ? 'text-white bg-white/[0.06]' : 'text-[#94A3B8] hover:text-white hover:bg-white/[0.06]'}`}
          >
            <Settings className="w-[18px] h-[18px]" />
            Configurações
          </Link>
        </div>
      </aside>
    </>
  )
}
