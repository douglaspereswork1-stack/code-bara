"use client"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Code, Trophy, Zap } from 'lucide-react'
import { Capybara } from '@/components/Capybara'

function FloatingIcon({ emoji, x, y, delay, size = "text-3xl" }: { emoji: string; x: string; y: string; delay: number; size?: string }) {
  return (
    <motion.div
      className={`absolute ${size} select-none pointer-events-none`}
      style={{ left: x, top: y }}
      animate={{ y: [0, -14, 0], rotate: [-3, 3, -3] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {emoji}
    </motion.div>
  )
}

function CapybaraHero() {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <div className="absolute inset-0 blur-3xl bg-[#22D3EE]/15 rounded-full scale-150" />
      <motion.div
        className="relative select-none"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Capybara size={130} />
      </motion.div>
      <motion.div
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-4xl"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
      >
        💻
      </motion.div>
      <motion.span className="absolute -top-2 -right-2 text-2xl" animate={{ scale: [1, 1.3, 1], rotate: [0, 12, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>✨</motion.span>
      <motion.span className="absolute top-4 -left-4 text-xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}>⭐</motion.span>
    </motion.div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Hero */}
      <header className="relative flex-1 flex flex-col items-center justify-center px-4 text-center py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingIcon emoji="🌿" x="8%" y="12%" delay={0} />
          <FloatingIcon emoji="🌿" x="82%" y="18%" delay={0.4} />
          <FloatingIcon emoji="💧" x="12%" y="68%" delay={0.8} />
          <FloatingIcon emoji="🍃" x="88%" y="72%" delay={1.0} />
          <FloatingIcon emoji="🍃" x="5%" y="42%" delay={0.6} />
          <FloatingIcon emoji="✨" x="92%" y="42%" delay={1.2} />
        </div>

        <motion.div
          className="flex items-center gap-2 mb-6"
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#3B82F6] flex items-center justify-center p-1 shadow-lg shadow-[#3B82F6]/20">
            <Capybara size={28} />
          </div>
          <span className="text-xl font-bold tracking-tight">DevFullStack</span>
          <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded-md bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white">PRO</span>
        </motion.div>

        <CapybaraHero />

        <motion.h1
          className="text-4xl md:text-6xl font-black mb-4 max-w-3xl tracking-tight"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Aprenda a{" "}
          <span className="bg-gradient-to-r from-[#22D3EE] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent">
            programar
          </span>
          <br />
          no ritmo da capivara
        </motion.h1>

        <motion.p
          className="text-lg text-muted-foreground mb-2 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          25 módulos, 750h, projetos reais, debugging, testes e code review.
          Sem pressa, sem burnout — como capivara na água. 💦
        </motion.p>
        <motion.p
          className="text-sm text-[#22D3EE]/80 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Calma, mas nunca para. Constância &gt; intensidade.
        </motion.p>

        <motion.div
          className="flex gap-4 flex-wrap justify-center"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#22D3EE] to-[#3B82F6] text-white rounded-full font-bold shadow-lg shadow-[#3B82F6]/25 hover:shadow-[#3B82F6]/35 transition"
            >
              Começar Agora →
            </Link>
          </motion.div>
          <Link
            href="/curso/dev-fullstack"
            className="px-7 py-3 border-2 border-border rounded-full font-semibold hover:bg-secondary transition"
          >
            Ver Módulos
          </Link>
        </motion.div>

        <motion.p
          className="mt-4 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Grátis pra começar • Sem cartão • Capivara aprova ✅
        </motion.p>
      </header>

      {/* Stats */}
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: "Módulos", value: "25", emoji: "📚" },
            { icon: Code, label: "Exercícios", value: "433+", emoji: "⌨️" },
            { icon: Trophy, label: "Projetos", value: "8+", emoji: "🏗️" },
            { icon: Zap, label: "Horas", value: "750+", emoji: "⚡" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-5 rounded-2xl bg-[#0D1528] border border-white/[0.06] relative overflow-hidden group hover:border-[#22D3EE]/20 hover:-translate-y-0.5 transition-all"
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <div className="text-3xl font-black">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Capy wisdom */}
      <section className="px-4">
        <motion.div
          className="max-w-3xl mx-auto rounded-2xl border border-[#22D3EE]/15 bg-gradient-to-r from-[#22D3EE]/10 via-[#3B82F6]/10 to-[#8B5CF6]/10 p-5 flex gap-4 items-center"
          initial={{ scale: 0.96, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="shrink-0"><Capybara size={44} /></span>
          <div>
            <div className="font-bold text-sm">Sabedoria da capivara</div>
            <div className="text-sm text-muted-foreground">
              “Capivara não corre, mas chega. Estude 30 min todo dia — streak de 30 dias vale mais que 10h num fim de semana.”
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-center mb-2">Por que capivaras aprendem melhor?</h2>
          <p className="text-center text-muted-foreground mb-10 text-sm">Calma, consistência e diversão — o resto a gente ensina</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "🐛", title: "Debug Real", desc: "Breakpoints, stack traces, debugging sistemático. Capivara investiga com calma." },
              { icon: "🧪", title: "TDD desde cedo", desc: "Red-Green-Refactor como disciplina. Testa antes, como capivara checa a água." },
              { icon: "👀", title: "Reading Code", desc: "80% é código legado. Aprenda a ler código dos outros sem pânico." },
              { icon: "🚀", title: "Deploy Real", desc: "Se só roda na sua máquina, não conta. Deploy automatizado de verdade." },
              { icon: "👥", title: "Code Review", desc: "Revise código de colegas e receba feedback — alcateia de capivaras." },
              { icon: "🧠", title: "Revisão Espaçada", desc: "FSRS (Anki). Revise no momento certo pra não esquecer. Memória de capivara!" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                className="p-6 rounded-2xl bg-[#0D1528] border border-white/[0.06] hover:border-[#22D3EE]/20 hover:-translate-y-0.5 transition-all group"
                initial={{ y: 12, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-10">
        <motion.div
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] p-8 md:p-10 text-white text-center relative overflow-hidden"
          whileInView={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0.98, opacity: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-6 -right-6 opacity-20"><Capybara size={90} /></div>
          <div className="absolute -bottom-6 -left-6 text-7xl opacity-20">🌿</div>
          <h3 className="text-2xl md:text-3xl font-black mb-2 relative">Bora codar, capivara? 💻</h3>
          <p className="text-white/85 mb-6 relative">Entre na alcateia. Primeiro módulo grátis.</p>
          <Link href="/register" className="inline-flex px-8 py-3 bg-white text-[#3B82F6] rounded-full font-black hover:bg-white/90 transition relative">
            Criar minha conta →
          </Link>
        </motion.div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <span>DevFullStack © 2026 — capivara edition</span>
          <span>Feito com 💧🌿 e muito café — sem capivara foi maltratada</span>
        </div>
      </footer>
    </div>
  )
}
