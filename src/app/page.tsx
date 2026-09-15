"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Code2, Trophy, Zap, Sparkles, GraduationCap, Users, ShieldCheck, Gift, Play, ArrowRight, Moon, ChevronDown } from 'lucide-react'
import { Capybara } from '@/components/Capybara'

function FolderIcon() {
  return <span className="inline-block w-4 h-3.5 rounded bg-[#3B82F6]/30 border border-[#3B82F6]/40 shrink-0" />
}

function FileIcon() {
  return <span className="inline-block w-3.5 h-4 rounded-sm bg-[#94A3B8]/20 border border-[#94A3B8]/30 shrink-0" />
}

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

      {/* HERO — background boia-sol + capivara PNG por cima */}
      <section className="relative min-h-[90vh] lg:min-h-[93vh] overflow-hidden">
        {/* fundo base escuro */}
        <div className="absolute inset-0 bg-[#050914]" />

        {/* background image — cena pôr do sol + boia (lado direito) */}
        <div
          className="absolute top-0 right-0 w-[75%] h-full bg-cover bg-top bg-no-repeat pointer-events-none"
          style={{ backgroundImage: 'url(/boia-sol.png)' }}
        />

        {/* overlay escuro que esconde a borda esquerda do background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-[#050914] via-[#050914] to-transparent" />
          <div className="absolute top-0 left-[30%] w-[30%] h-full bg-gradient-to-r from-[#050914]/80 to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#050914] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050914] to-transparent" />
        </div>

        {/* ── conteúdo ── */}
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 w-full grid lg:grid-cols-[1fr_1.1fr] gap-0 items-center h-full min-h-[90vh] lg:min-h-[93vh]">
          {/* ═══ LEFT — texto ═══ */}
          <div className="relative z-20 py-12 lg:py-0">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]">
              <span className="w-5 h-5 rounded-full bg-[#22D3EE]/20 flex items-center justify-center"><Sparkles className="w-3 h-3" /></span> Sua jornada fullstack começa aqui!
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="mt-6 text-[40px] sm:text-[52px] lg:text-[62px] font-black leading-[0.9] tracking-tight text-white">
              Aprenda a{' '}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">programar</span>
              <br />no ritmo da capivara
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-5 text-sm lg:text-base leading-relaxed text-[#94A3B8] max-w-md">
              25 módulos, 750h de conteúdo, projetos reais, debugging, testes e code review. Sem pressa, sem burnout — como capivara na água.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-7 grid grid-cols-2 gap-3 max-w-md">
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
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#8B5CF6] text-white font-bold shadow-lg shadow-[#3B82F6]/25 hover:brightness-110 transition text-sm">
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center"><Play className="w-3 h-3 text-[#3B82F6] fill-[#3B82F6]" /></span> Começar Agora <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/curso/dev-fullstack" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-transparent border border-white/20 text-white font-semibold hover:bg-white/[0.06] transition text-sm">
                <Play className="w-3 h-3 text-[#22D3EE] fill-[#22D3EE]" /> Ver Módulos
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-5 flex items-center gap-2 text-xs text-[#64748B]">
              <Gift className="w-3.5 h-3.5" /> Grátis pra começar <span className="w-1 h-1 rounded-full bg-[#64748B]" /> Sem cartão <span className="w-1 h-1 rounded-full bg-[#64748B]" /> Capivara aprova <span className="w-3.5 h-3.5 rounded bg-[#10B981] flex items-center justify-center text-white text-[10px]">✓</span>
            </motion.div>
          </div>

          {/* ═══ RIGHT — capivara gigante por cima do background ═══ */}
          <div className="relative h-[520px] lg:h-[700px]">
            {/* CAPIVARA — 1200px, sentada na boia */}
            <motion.img
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              src="/capivara-removebg-preview.png"
              alt="Capivara programando"
              className="absolute bottom-0 left-[10%] w-[1200px] h-[1200px] object-contain object-bottom z-10"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}
            />

            {/* ─── floating: file tree ─── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-[4%] left-0 hidden lg:flex flex-col gap-1 p-3 rounded-2xl bg-[#0D1528]/80 backdrop-blur-xl border border-[#22D3EE]/20 shadow-2xl z-30"
            >
              <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-medium">
                <FolderIcon /> src <ChevronDown className="w-3 h-3 ml-auto text-[#64748B]" />
              </div>
              <div className="pl-5 text-[11px] text-[#94A3B8] flex flex-col gap-0.5 font-medium">
                <span className="flex items-center gap-2"><FolderIcon /> components</span>
                <span className="flex items-center gap-2"><FolderIcon /> pages</span>
                <span className="flex items-center gap-2"><FileIcon /> utils</span>
                <span className="flex items-center gap-2"><FileIcon /> App.tsx</span>
              </div>
            </motion.div>

            {/* ─── floating: code snippet ─── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }}
              className="absolute top-[30%] left-[4%] hidden lg:block p-3 rounded-2xl bg-[#0D1528]/80 backdrop-blur-xl border border-[#22D3EE]/20 shadow-2xl z-30"
            >
              <div className="text-[11px] font-mono leading-relaxed">
                <span className="text-[#C084FC]">const</span> <span className="text-[#22D3EE]">app</span> <span className="text-[#64748B]">=</span> <span className="text-[#C084FC]">async</span> <span className="text-[#64748B]">() =&gt; {'{'}</span><br/>
                <span className="text-[#64748B]">&nbsp;&nbsp;</span><span className="text-[#C084FC]">return</span> <span className="text-[#34D399]">&quot;🚀&quot;</span><br/>
                <span className="text-[#64748B]">{'}'}</span>
              </div>
            </motion.div>

            {/* ─── floating: tech logos ─── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-[2%] right-[5%] hidden lg:grid grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#0D1528]/80 backdrop-blur-xl border border-[#22D3EE]/20 shadow-2xl z-30"
            >
              {[
                { bg: 'bg-[#F97316]', label: '5' },
                { bg: 'bg-[#3B82F6]', label: '3' },
                { bg: 'bg-[#FACC15] text-black', label: 'JS' },
                { bg: 'bg-[#22D3EE]/15 border border-[#22D3EE]/25', label: '⚛' },
                { bg: 'bg-[#10B981]/15 border border-[#10B981]/25', label: '⬢' },
                { bg: 'bg-[#22D3EE]/10 border border-[#22D3EE]/15', label: '🐬' },
              ].map((t, i) => (
                <span key={i} className={`w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black ${t.bg} ${t.bg.includes('text-black') ? '' : 'text-white'}`}>{t.label}</span>
              ))}
            </motion.div>

            {/* ─── floating: Código + Foco = Liberdade ─── */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
              className="absolute bottom-[12%] right-[8%] z-30 text-right hidden lg:block"
            >
              <div className="flex flex-col items-end leading-none">
                <span className="text-sm font-black text-[#22D3EE]">Código</span>
                <span className="text-[10px] text-[#94A3B8] my-0.5">+</span>
                <span className="text-sm font-black text-[#22D3EE]">Foco</span>
                <span className="text-[10px] text-[#94A3B8] my-0.5">=</span>
                <span className="text-lg font-black bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">Liberdade</span>
              </div>
            </motion.div>
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
