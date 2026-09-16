"use client"
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { BookOpen, Code2, Trophy, Zap, Sparkles, GraduationCap, Users, ShieldCheck, Gift, Play, ArrowRight, ChevronRight, Check, Lock, Star, Heart, Rocket, Terminal, Braces, Globe, Database, Cpu } from 'lucide-react'

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050914] overflow-hidden">

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#050914]" />
        <div
          className="absolute top-0 right-0 w-[75%] h-full bg-cover bg-top bg-no-repeat pointer-events-none opacity-80"
          style={{ backgroundImage: 'url(/cena-completa.png)' }}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[55%] h-full bg-gradient-to-r from-[#050914] via-[#050914] to-transparent" />
          <div className="absolute top-0 left-[35%] w-[25%] h-full bg-gradient-to-r from-[#050914]/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050914] to-transparent" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 w-full grid lg:grid-cols-[1.1fr_1fr] gap-0 items-center pt-24 pb-12 min-h-screen">
          <div className="relative z-20">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide px-3 py-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]">
              <span className="w-5 h-5 rounded-full bg-[#22D3EE]/20 flex items-center justify-center"><Sparkles className="w-3 h-3" /></span> Sua jornada fullstack começa aqui
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="mt-6 text-[40px] sm:text-[52px] lg:text-[62px] font-black leading-[0.9] tracking-tight text-white">
              Aprenda a{' '}
              <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">programar</span>
              <br />no ritmo da capivara
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-5 text-sm lg:text-base leading-relaxed text-[#94A3B8] max-w-md">
              25 módulos, 750h de conteúdo, projetos reais, debugging, testes e code review. Sem pressa, sem burnout.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-7 grid grid-cols-2 gap-3 max-w-md">
              {[
                { icon: Zap, label: 'Do zero ao avançado' },
                { icon: Code2, label: 'Projetos reais' },
                { icon: Users, label: 'Comunidade ativa' },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#22D3EE]/10 border border-[#22D3EE]/15 flex items-center justify-center shrink-0"><s.icon className="w-4 h-4 text-[#22D3EE]" /></span>
                  <span className="text-xs font-medium text-[#94A3B8] leading-tight">{s.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#8B5CF6] text-white font-bold shadow-lg shadow-[#3B82F6]/25 hover:brightness-110 transition text-sm">
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center"><Play className="w-3 h-3 text-[#3B82F6] fill-[#3B82F6]" /></span> Começar Agora <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#modulos" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-transparent border border-white/20 text-white font-semibold hover:bg-white/[0.06] transition text-sm">
                Ver Conteúdo <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          <div className="relative h-[400px] lg:h-[600px] overflow-visible hidden lg:block">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="absolute top-[8%] left-0 flex flex-col gap-1 p-3 rounded-2xl bg-[#0D1528]/80 backdrop-blur-xl border border-[#22D3EE]/20 shadow-2xl z-30">
              <div className="flex items-center gap-2 text-xs text-[#94A3B8] font-medium">
                <span className="inline-block w-4 h-3.5 rounded bg-[#3B82F6]/30 border border-[#3B82F6]/40" /> src <ChevronRight className="w-3 h-3 ml-auto text-[#64748B]" />
              </div>
              <div className="pl-5 text-[11px] text-[#94A3B8] flex flex-col gap-0.5 font-medium">
                <span className="flex items-center gap-2"><span className="inline-block w-4 h-3.5 rounded bg-[#3B82F6]/30 border border-[#3B82F6]/40" /> components</span>
                <span className="flex items-center gap-2"><span className="inline-block w-4 h-3.5 rounded bg-[#3B82F6]/30 border border-[#3B82F6]/40" /> pages</span>
                <span className="flex items-center gap-2"><span className="inline-block w-3.5 h-4 rounded-sm bg-[#94A3B8]/20 border border-[#94A3B8]/30" /> utils</span>
                <span className="flex items-center gap-2"><span className="inline-block w-3.5 h-4 rounded-sm bg-[#94A3B8]/20 border border-[#94A3B8]/30" /> App.tsx</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="absolute top-[35%] left-[4%] p-3 rounded-2xl bg-[#0D1528]/80 backdrop-blur-xl border border-[#22D3EE]/20 shadow-2xl z-30">
              <div className="text-[11px] font-mono leading-relaxed">
                <span className="text-[#C084FC]">const</span> <span className="text-[#22D3EE]">app</span> <span className="text-[#64748B]">=</span> <span className="text-[#C084FC]">async</span> <span className="text-[#64748B]">() =&gt; {'{'}</span><br/>
                <span className="text-[#64748B]">&nbsp;&nbsp;</span><span className="text-[#C084FC]">return</span> <span className="text-[#34D399]">&quot;🚀&quot;</span><br/>
                <span className="text-[#64748B]">{'}'}</span>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="absolute bottom-[15%] right-[8%] z-30 text-right">
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

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
          <a href="#stats" className="flex flex-col items-center gap-1 text-[#64748B] hover:text-[#22D3EE] transition">
            <span className="text-[10px] tracking-widest font-semibold">SCROLL</span>
            <div className="w-5 h-8 rounded-full border border-current flex justify-center pt-1.5">
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-1 rounded-full bg-current" />
            </div>
          </a>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section id="stats" className="max-w-7xl mx-auto px-4 lg:px-6 w-full py-20">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: BookOpen, value: '25', label: 'Módulos', sub: 'Do básico ao avançado' },
              { icon: Code2, value: '433+', label: 'Exercícios', sub: 'Pratique de verdade' },
              { icon: Trophy, value: '8+', label: 'Projetos', sub: 'Monte seu portfólio' },
              { icon: Zap, value: '750+', label: 'Horas', sub: 'Conteúdo completo' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6 text-center hover:border-[#22D3EE]/20 transition group">
                  <div className="w-12 h-12 rounded-xl bg-[#22D3EE]/10 border border-[#22D3EE]/15 flex items-center justify-center mx-auto group-hover:bg-[#22D3EE]/20 transition">
                    <s.icon className="w-5 h-5 text-[#22D3EE]" />
                  </div>
                  <div className="text-3xl font-black text-white mt-3">{s.value}</div>
                  <div className="text-sm font-semibold text-white mt-1">{s.label}</div>
                  <div className="text-xs text-[#64748B] mt-1">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ══════════ O QUE VOCE VAI APRENDER ══════════ */}
      <section id="modulos" className="max-w-7xl mx-auto px-4 lg:px-6 w-full py-20">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-[#22D3EE] uppercase">Conteúdo</span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mt-2">O que você vai <span className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">aprender</span></h2>
            <p className="text-sm text-[#94A3B8] mt-3 max-w-lg mx-auto">Do HTML ao deploy — trilha completa pra virar dev fullstack de verdade.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Braces, title: 'Fundamentos', desc: 'HTML, CSS, JavaScript, lógica de programação e algoritmos.', color: '#22D3EE' },
            { icon: Globe, title: 'Frontend Moderno', desc: 'React, Next.js, TypeScript, Tailwind CSS e design systems.', color: '#3B82F6' },
            { icon: Database, title: 'Backend & Banco de Dados', desc: 'Node.js, APIs REST, SQL, Prisma e autenticação.', color: '#8B5CF6' },
            { icon: Terminal, title: 'DevOps & Deploy', desc: 'Git, CI/CD, Docker, Vercel e monitoramento.', color: '#10B981' },
            { icon: Rocket, title: 'Projetos Reais', desc: 'SaaS, e-commerce, dashboard — 8+ projetos pro portfólio.', color: '#F59E0B' },
            { icon: Cpu, title: 'IA & Ferramentas', desc: 'Copilot, testes automatizados, code review e boas práticas.', color: '#EF4444' },
          ].map((m, i) => (
            <Reveal key={m.title} delay={i * 0.08}>
              <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6 hover:border-white/10 transition group h-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${m.color}15`, border: `1px solid ${m.color}25` }}>
                  <m.icon className="w-5 h-5" style={{ color: m.color }} />
                </div>
                <h3 className="text-base font-bold text-white">{m.title}</h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════ POR QUE CODE.ZEN ══════════ */}
      <section className="max-w-7xl mx-auto px-4 lg:px-6 w-full py-20">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest text-[#8B5CF6] uppercase">Diferencial</span>
            <h2 className="text-3xl lg:text-4xl font-black text-white mt-2">Por que <span className="text-[#FACC15]">Code.Zen</span>?</h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Heart, title: 'Sem burnout', desc: 'Aprenda no seu ritmo, como a capivara. Sem cobrança, sem pressão.' },
            { icon: ShieldCheck, title: 'Projetos reais', desc: 'Não é só teoria — cada módulo tem projeto pra colocar no portfólio.' },
            { icon: Users, title: 'Comunidade', desc: 'Grupo exclusivo pra tirar dúvidas, networking e motivação.' },
            { icon: Star, title: 'Certificado', desc: 'Certificado de conclusão pra valorizar seu currículo e LinkedIn.' },
          ].map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-[#0D1528] border border-white/[0.06] hover:border-white/10 transition">
                <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{f.title}</h3>
                  <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════ CTA / PAGAMENTO ══════════ */}
      <section id="pagamento" className="max-w-7xl mx-auto px-4 lg:px-6 w-full py-20">
        <Reveal>
          <div className="max-w-xl mx-auto">
            <div className="rounded-3xl bg-gradient-to-b from-[#0D1528] to-[#080E1F] border border-white/[0.08] overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#8B5CF6] flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white">Desbloqueie o <span className="text-[#FACC15]">Code.Zen</span></h2>
                <p className="text-sm text-[#94A3B8] mt-2">Acesso vitalício a toda a plataforma</p>

                <div className="mt-6">
                  <div className="text-4xl font-black text-white">R$ 899<span className="text-lg text-[#94A3B8]">,99</span></div>
                  <div className="text-xs text-[#64748B] mt-1">Pagamento único • Acesso vitalício</div>
                </div>

                <div className="mt-6 space-y-3 text-left">
                  {['25 módulos completos', '433+ exercícios práticos', '8+ projetos reais', 'Suporte da comunidade', '750h de conteúdo'].map(f => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#10B981]/15 border border-[#10B981]/25 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#10B981]" />
                      </div>
                      <span className="text-sm text-[#94A3B8]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="px-8 pb-8">
                <Link href="/register" className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#8B5CF6] text-white font-bold shadow-lg shadow-[#3B82F6]/25 hover:brightness-110 transition text-sm">
                  Criar Conta e Pagar <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-center text-[11px] text-[#64748B] mt-3">Pagamento seguro via Mercado Pago • PIX ou Cartão</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="border-t border-white/[0.06] mt-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-black tracking-tight text-white text-lg">Code.<span className="text-[#FACC15]">Zen</span></span>
            </div>
            <div className="flex items-center gap-6 text-xs text-[#64748B]">
              <Link href="/login" className="hover:text-white transition">Entrar</Link>
              <Link href="/register" className="hover:text-white transition">Criar conta</Link>
              <span>© 2026 Code.Zen</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
