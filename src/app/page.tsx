"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Code2, Trophy, Zap, Sparkles, GraduationCap, Users, ShieldCheck, Gift, Play, ArrowRight, Moon, ChevronDown } from 'lucide-react'
import { Capybara } from '@/components/Capybara'

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[#050914]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-[64px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="w-9 h-9 rounded-xl bg-[#F5C6A0] flex items-center justify-center text-lg overflow-hidden">🐻</span>
          <span className="font-black tracking-tight text-white text-lg">Code.Bara</span>
          <span className="text-[10px] font-black tracking-widest px-1.5 py-0.5 rounded-md bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white">PRO</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-[#22D3EE] border-b-2 border-[#22D3EE] pb-1 -mb-1">Início</Link>
          <Link href="/curso/dev-fullstack" className="text-[#94A3B8] hover:text-white transition">Módulos</Link>
          <Link href="/projetos" className="text-[#94A3B8] hover:text-white transition">Projetos</Link>
          <Link href="#" className="text-[#94A3B8] hover:text-white transition">Certificados</Link>
          <Link href="#" className="text-[#94A3B8] hover:text-white transition">Suporte</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Tema" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[#94A3B8] hover:text-white"><Moon className="w-4 h-4" /></button>
          <Link href="/login" className="hidden sm:flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-sm font-medium text-white hover:bg-white/[0.1] transition">
            <span className="w-7 h-7 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-xs">👤</span> Minha Conta <ChevronDown className="w-3 h-3 text-[#64748B]" />
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050914] overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1020] via-[#050914] to-[#050914] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.12),transparent_50%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12 grid lg:grid-cols-2 gap-8 items-center">
          {/* left */}
          <div>
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]">
              <span className="w-5 h-5 rounded-full bg-[#22D3EE]/20 flex items-center justify-center"><Sparkles className="w-3 h-3" /></span> Sua jornada fullstack começa aqui!
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-5 text-4xl lg:text-[52px] font-black leading-[0.95] tracking-tight text-white">
              Aprenda a <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">programar</span><br />no ritmo da capivara
            </motion.h1>
            <p className="mt-4 text-sm lg:text-[15px] leading-relaxed text-[#94A3B8] max-w-xl">
              25 módulos, 750h de conteúdo, projetos reais, debugging, testes<br className="hidden lg:block" /> e code review. Sem pressa, sem burnout — como capivara na água.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 max-w-xl">
              {[
                { icon: Zap, label: 'Do zero\nao avançado' },
                { icon: Code2, label: 'Projetos reais\ndo mercado' },
                { icon: Users, label: 'Suporte da\ncomunidade' },
                { icon: ShieldCheck, label: 'Acesso vitalício\ne certificado' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/15 flex items-center justify-center shrink-0"><s.icon className="w-4 h-4 text-[#22D3EE]" /></span>
                  <span className="text-xs font-medium text-[#94A3B8] whitespace-pre leading-tight">{s.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#8B5CF6] text-white font-bold shadow-lg shadow-[#3B82F6]/20 hover:brightness-110 transition">
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center"><Play className="w-3 h-3 text-[#3B82F6] fill-[#3B82F6]" /></span> Começar Agora <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/curso/dev-fullstack" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-white/20 text-white font-semibold hover:bg-white/[0.06] transition">
                <Play className="w-3 h-3 text-[#22D3EE] fill-[#22D3EE]" /> Ver Módulos
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#64748B]">
              <Gift className="w-3.5 h-3.5" /> Grátis pra começar <span className="w-1 h-1 rounded-full bg-[#64748B]" /> Sem cartão <span className="w-1 h-1 rounded-full bg-[#64748B]" /> Capivara aprova <span className="w-3 h-3 rounded bg-[#10B981] flex items-center justify-center text-white text-[10px]">✓</span>
            </div>
          </div>

          {/* right — capybara illustration */}
          <div className="relative lg:h-[520px] flex items-center justify-center">
            {/* glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 via-transparent to-[#8B5CF6]/10 rounded-3xl blur-2xl pointer-events-none" />
            {/* floating cards */}
            <div className="absolute top-6 left-6 hidden lg:flex flex-col gap-1.5 p-3 rounded-2xl bg-[#0D1528]/90 backdrop-blur border border-[#22D3EE]/20 shadow-xl">
              <div className="flex items-center gap-2 text-xs text-[#94A3B8]"><span className="w-6 h-6 rounded bg-[#3B82F6]/20 flex items-center justify-center">📁</span> src <span className="ml-auto text-[10px] text-[#64748B]">▼</span></div>
              <div className="pl-4 text-xs text-[#94A3B8] flex flex-col gap-1">
                <span>📁 components</span><span>📁 pages</span><span>📄 utils</span><span>📄 App.tsx</span>
              </div>
            </div>
            <div className="absolute top-10 right-4 hidden lg:grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#0D1528]/90 backdrop-blur border border-[#22D3EE]/20 shadow-xl">
              {[
                { bg: 'bg-[#F97316]', label: '5', sub: 'HTML' },
                { bg: 'bg-[#3B82F6]', label: '3', sub: 'CSS' },
                { bg: 'bg-[#FACC15] text-black', label: 'JS', sub: 'JS' },
                { bg: 'bg-[#22D3EE]/15 border border-[#22D3EE]/20', label: '⚛', sub: 'React' },
                { bg: 'bg-[#10B981]/15 border border-[#10B981]/20', label: '⬢', sub: 'Node.js' },
                { bg: 'bg-[#22D3EE]/10 border border-[#22D3EE]/15', label: '🐬', sub: 'MySQL' },
              ].map(t => (
                <div key={t.sub} className="flex flex-col items-center gap-1">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${t.bg} ${t.bg.includes('text-black')?'':'text-white'}`}>{t.label}</span>
                  <span className="text-[10px] text-[#94A3B8]">{t.sub}</span>
                </div>
              ))}
            </div>

            {/* capybara PNG recortada */}
            <div className="relative">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[520px] h-[160px] bg-[#22D3EE]/25 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#22D3EE]/5 via-transparent to-transparent rounded-3xl pointer-events-none" />
              <div className="relative w-[360px] lg:w-[520px] h-[400px] lg:h-[460px] flex items-center justify-center">
                <img
                  src="/capivara-hero.png"
                  alt="Capivara na boia com laptop"
                  className="relative w-full h-full object-contain drop-shadow-2xl"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none peer-[img[style*='display: none']]:flex hidden">
                  <Capybara size={240} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 w-full -mt-2">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, value: '25', label: 'Módulos', sub: 'Do básico ao avançado' },
            { icon: Code2, value: '433+', label: 'Exercícios', sub: 'Pratique de verdade' },
            { icon: Trophy, value: '8+', label: 'Projetos', sub: 'Monte seu portfólio' },
            { icon: Zap, value: '750+', label: 'Horas', sub: 'Conteúdo completo' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6 text-center hover:border-white/10 transition">
              <s.icon className="w-6 h-6 mx-auto text-[#22D3EE]" />
              <div className="text-3xl font-black text-white mt-2">{s.value}</div>
              <div className="text-sm font-semibold text-white">{s.label}</div>
              <div className="text-xs text-[#64748B] mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* footer line */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 w-full py-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#22D3EE]/30 to-transparent" />
        <span className="text-[11px] tracking-[0.2em] font-semibold text-[#64748B]">DEVS MELHORES, UM BRASIL MAIS FORTE</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#22D3EE]/30 to-transparent" />
      </div>
    </div>
  )
}
