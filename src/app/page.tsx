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

      {/* HERO — capivara gigante como na referência */}
      <section className="relative min-h-[92vh] lg:min-h-[95vh] flex items-center overflow-hidden">
        {/* fundo gradiente escuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#050914] via-[#0A1020] to-[#050914]" />

        {/* cena de fundo: pôr do sol + água (lado direito) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* glow laranja/dourado do pôr do sol — direita */}
          <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-gradient-radial from-[#F97316]/20 via-[#FACC15]/8 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-gradient-radial from-[#FB923C]/15 via-[#F97316]/5 to-transparent rounded-full blur-2xl" />
          {/* glow azul/cyan inferior — reflexo na água */}
          <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-gradient-to-t from-[#0E4A6B]/30 via-[#22D3EE]/8 to-transparent blur-xl" />
          <div className="absolute bottom-[5%] left-[20%] w-[600px] h-[200px] bg-gradient-to-t from-[#22D3EE]/6 to-transparent rounded-full blur-2xl" />
          {/* linhas de água */}
          <div className="absolute bottom-[22%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#22D3EE]/15 to-transparent" />
          <div className="absolute bottom-[18%] left-[10%] right-[30%] h-px bg-gradient-to-r from-transparent via-[#22D3EE]/10 to-transparent" />
          <div className="absolute bottom-[14%] left-[20%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#22D3EE]/8 to-transparent" />
          {/* silhuetas de palmeiras — canto inferior esquerdo */}
          <div className="absolute -bottom-2 left-0 w-48 h-64 opacity-20">
            <div className="absolute bottom-0 left-8 w-2 h-40 bg-gradient-to-t from-[#0A2F1A] to-[#1A3A2A] rounded-full" />
            <div className="absolute bottom-32 left-0 w-24 h-24 bg-gradient-to-br from-[#0A2F1A] to-transparent rounded-full blur-sm rotate-[-20deg]" />
            <div className="absolute bottom-36 left-4 w-20 h-20 bg-gradient-to-bl from-[#0A2F1A] to-transparent rounded-full blur-sm rotate-[15deg]" />
            <div className="absolute bottom-40 left-12 w-16 h-16 bg-gradient-to-t from-[#0A2F1A] to-transparent rounded-full blur-sm rotate-[-5deg]" />
          </div>
          {/* silhuetas de palmeiras — canto inferior direito */}
          <div className="absolute -bottom-2 right-8 w-40 h-56 opacity-15">
            <div className="absolute bottom-0 left-10 w-1.5 h-36 bg-gradient-to-t from-[#0A2F1A] to-[#1A3A2A] rounded-full" />
            <div className="absolute bottom-28 left-2 w-20 h-20 bg-gradient-to-bl from-[#0A2F1A] to-transparent rounded-full blur-sm rotate-[20deg]" />
            <div className="absolute bottom-32 left-8 w-16 h-16 bg-gradient-to-br from-[#0A2F1A] to-transparent rounded-full blur-sm rotate-[-15deg]" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-6 w-full grid lg:grid-cols-[1fr_1.1fr] gap-4 items-center pt-20 pb-8">
          {/* LEFT — texto */}
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]">
              <span className="w-5 h-5 rounded-full bg-[#22D3EE]/20 flex items-center justify-center"><Sparkles className="w-3 h-3" /></span> Sua jornada fullstack começa aqui!
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-5 text-4xl sm:text-5xl lg:text-[56px] font-black leading-[0.92] tracking-tight text-white">
              Aprenda a <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">programar</span><br />no ritmo da capivara
            </motion.h1>
            <p className="mt-4 text-sm lg:text-[15px] leading-relaxed text-[#94A3B8] max-w-lg">
              25 módulos, 750h de conteúdo, projetos reais, debugging, testes<br className="hidden lg:block" /> e code review. Sem pressa, sem burnout — como capivara na água.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 max-w-lg">
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

          {/* RIGHT — capivara gigante + elementos flutuantes */}
          <div className="relative h-[480px] sm:h-[540px] lg:h-[620px] flex items-center justify-center">
            {/* cards flutuantes — file tree (esquerda) */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="absolute top-8 left-0 lg:left-4 hidden lg:flex flex-col gap-1.5 p-3 rounded-2xl bg-[#0D1528]/90 backdrop-blur-md border border-[#22D3EE]/20 shadow-2xl shadow-[#22D3EE]/5 z-20">
              <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-medium">
                <FolderIcon /> src <ChevronDown className="w-3 h-3 ml-auto text-[#64748B]" />
              </div>
              <div className="pl-5 text-xs text-[#94A3B8] flex flex-col gap-1 font-medium">
                <span className="flex items-center gap-2"><FolderIcon /> components</span>
                <span className="flex items-center gap-2"><FolderIcon /> pages</span>
                <span className="flex items-center gap-2"><FileIcon /> utils</span>
                <span className="flex items-center gap-2"><FileIcon /> App.tsx</span>
              </div>
            </motion.div>

            {/* cards flutuantes — code snippet (meio-esquerda) */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="absolute top-24 left-8 lg:left-24 hidden lg:block p-3 rounded-2xl bg-[#0D1528]/90 backdrop-blur-md border border-[#22D3EE]/20 shadow-2xl shadow-[#22D3EE]/5 z-20 max-w-[200px]">
              <div className="text-[10px] font-mono text-[#94A3B8] leading-relaxed">
                <span className="text-[#8B5CF6]">const</span> <span className="text-[#22D3EE]">app</span> <span className="text-[#94A3B8]">=</span> <span className="text-[#8B5CF6]">async</span> <span className="text-[#94A3B8]">() =&gt; {'{'}</span><br/>
                <span className="text-[#94A3B8]">&nbsp;&nbsp;</span><span className="text-[#8B5CF6]">return</span> <span className="text-[#10B981]">&quot;🚀&quot;</span><br/>
                <span className="text-[#94A3B8]">{'}'}</span>
              </div>
            </motion.div>

            {/* cards flutuantes — tech logos (direita) */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="absolute top-6 right-0 lg:right-8 hidden lg:grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#0D1528]/90 backdrop-blur-md border border-[#22D3EE]/20 shadow-2xl shadow-[#22D3EE]/5 z-20">
              {[
                { bg: 'bg-[#F97316]', label: '5', sub: 'HTML' },
                { bg: 'bg-[#3B82F6]', label: '3', sub: 'CSS' },
                { bg: 'bg-[#FACC15] text-black', label: 'JS', sub: 'JS' },
                { bg: 'bg-[#22D3EE]/15 border border-[#22D3EE]/20', label: '⚛', sub: 'React' },
                { bg: 'bg-[#10B981]/15 border border-[#10B981]/20', label: '⬢', sub: 'Node.js' },
                { bg: 'bg-[#22D3EE]/10 border border-[#22D3EE]/15', label: '🐬', sub: 'MySQL' },
              ].map(t => (
                <div key={t.sub} className="flex flex-col items-center gap-1">
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black ${t.bg} ${t.bg.includes('text-black')?'':'text-white'}`}>{t.label}</span>
                  <span className="text-[10px] text-[#94A3B8]">{t.sub}</span>
                </div>
              ))}
            </motion.div>

            {/* "Código + Foco = Liberdade" flutuante (direita, em cima da capivara) */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="absolute bottom-[22%] right-0 lg:right-12 z-20 text-right hidden lg:block">
              <div className="flex flex-col items-end gap-0.5">
                <span className="text-xs font-bold text-[#22D3EE] tracking-wide">Código</span>
                <span className="text-[10px] text-[#94A3B8]">+</span>
                <span className="text-xs font-bold text-[#22D3EE] tracking-wide">Foco</span>
                <span className="text-[10px] text-[#94A3B8]">=</span>
                <span className="text-sm font-black text-[#22D3EE] tracking-wide">Liberdade</span>
              </div>
            </motion.div>

            {/* CAPIVARA — imagem gigante, centro-direita */}
            <div className="relative z-10 w-full h-full flex items-center justify-center lg:justify-end lg:pr-4">
              <img
                src="/capivara-hero.png"
                alt="Capivara programando na água ao pôr do sol"
                className="relative z-10 w-[85%] max-w-[580px] h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                style={{ filter: 'drop-shadow(0 0 40px rgba(34,211,238,0.12)) drop-shadow(0 0 80px rgba(249,115,22,0.08))' }}
              />
              {/* glow atrás da capivara */}
              <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[120px] bg-[#22D3EE]/8 rounded-full blur-3xl" />
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
