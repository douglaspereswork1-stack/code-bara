import Link from 'next/link'
import { CheckCircle, Circle, Lock, Clock, Zap, ChevronRight, Code2, Sparkles } from 'lucide-react'

type ModuleData = {
  id: string
  order: number
  title: string
  slug: string
  description: string
  xpReward: number
  lessons: { id: string; title: string; type: string; durationMin: number; xpReward: number }[]
}

const MODULES: ModuleData[] = [
  { id: 'm1', order: 1, title: 'JavaScript Basics', slug: 'js-basics', description: 'Variáveis, tipos, operadores, funções e controle de fluxo', xpReward: 100, lessons: [{ id: 'l1', title: 'Variáveis e Tipos', type: 'THEORY', durationMin: 15, xpReward: 15 }, { id: 'l2', title: 'Operadores e Expressões', type: 'THEORY', durationMin: 15, xpReward: 15 }, { id: 'l3', title: 'Condicionais e Loops', type: 'PRACTICE', durationMin: 20, xpReward: 15 }, { id: 'l4', title: 'Funções e Escopo', type: 'THEORY', durationMin: 20, xpReward: 15 }, { id: 'l5', title: 'Exercícios Práticos', type: 'EXERCISE', durationMin: 30, xpReward: 20 }, { id: 'l6', title: 'Quiz — JS Basics', type: 'CHALLENGE', durationMin: 10, xpReward: 25 }] },
  { id: 'm2', order: 2, title: 'HTML & CSS Basics', slug: 'html-css', description: 'Estrutura HTML, semântica, CSS Box Model, Flexbox e Grid', xpReward: 100, lessons: [{ id: 'l7', title: 'Estrutura HTML', type: 'THEORY', durationMin: 15, xpReward: 15 }, { id: 'l8', title: 'Semântica e Acessibilidade', type: 'THEORY', durationMin: 15, xpReward: 15 }, { id: 'l9', title: 'CSS Box Model', type: 'THEORY', durationMin: 15, xpReward: 15 }, { id: 'l10', title: 'Flexbox na Prática', type: 'PRACTICE', durationMin: 20, xpReward: 15 }, { id: 'l11', title: 'Grid Layout', type: 'PRACTICE', durationMin: 20, xpReward: 15 }, { id: 'l12', title: 'Projeto: Landing Page', type: 'EXERCISE', durationMin: 45, xpReward: 30 }] },
  { id: 'm3', order: 3, title: 'Git & GitHub', slug: 'git-github', description: 'Versionamento, branches, merge, rebase e colaboração', xpReward: 100, lessons: [{ id: 'l13', title: 'Por que Git?', type: 'THEORY', durationMin: 10, xpReward: 10 }, { id: 'l14', title: 'Comandos Essenciais', type: 'DEMONSTRATION', durationMin: 20, xpReward: 15 }, { id: 'l15', title: 'Branches e Merge', type: 'THEORY', durationMin: 15, xpReward: 15 }, { id: 'l16', title: 'GitHub e Pull Requests', type: 'PRACTICE', durationMin: 25, xpReward: 20 }, { id: 'l17', title: 'Exercício: Primeiro Repo', type: 'EXERCISE', durationMin: 30, xpReward: 20 }] },
  { id: 'm4', order: 4, title: 'JavaScript Advanced', slug: 'js-advanced', description: 'Async/Await, Promises, DOM, Events, Closures e Prototypes', xpReward: 150, lessons: [{ id: 'l18', title: 'DOM e Seleção', type: 'THEORY', durationMin: 15, xpReward: 15 }, { id: 'l19', title: 'Events e Listeners', type: 'PRACTICE', durationMin: 20, xpReward: 15 }, { id: 'l20', title: 'Promises e Async/Await', type: 'THEORY', durationMin: 25, xpReward: 20 }, { id: 'l21', title: 'Closures e Hoisting', type: 'THEORY', durationMin: 20, xpReward: 15 }, { id: 'l22', title: 'Debugging no Browser', type: 'DEBUG_CHALLENGE', durationMin: 25, xpReward: 20 }, { id: 'l23', title: 'Reading Code', type: 'READING', durationMin: 20, xpReward: 15 }, { id: 'l24', title: 'Exercícios Async', type: 'EXERCISE', durationMin: 40, xpReward: 25 }, { id: 'l25', title: 'Quiz — JS Advanced', type: 'CHALLENGE', durationMin: 15, xpReward: 30 }] },
  { id: 'm5', order: 5, title: 'Node.js Fundamentals', slug: 'nodejs', description: 'Runtime, módulos, npm, Express e APIs REST', xpReward: 150, lessons: [{ id: 'l26', title: 'O que é Node.js?', type: 'THEORY', durationMin: 10, xpReward: 10 }, { id: 'l27', title: 'Módulos e npm', type: 'THEORY', durationMin: 15, xpReward: 15 }, { id: 'l28', title: 'Express na Prática', type: 'DEMONSTRATION', durationMin: 25, xpReward: 20 }, { id: 'l29', title: 'REST API Completa', type: 'PRACTICE', durationMin: 40, xpReward: 25 }, { id: 'l30', title: 'Middleware e Erros', type: 'THEORY', durationMin: 20, xpReward: 15 }, { id: 'l31', title: 'Projeto: API de Tarefas', type: 'EXERCISE', durationMin: 60, xpReward: 35 }, { id: 'l32', title: 'Testando sua API', type: 'EXERCISE', durationMin: 30, xpReward: 20 }] },
]

const TYPE_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  THEORY: { label: 'Teoria', icon: '📖', color: 'text-[#3B82F6]' },
  DEMONSTRATION: { label: 'Demo', icon: '🎬', color: 'text-[#8B5CF6]' },
  PRACTICE: { label: 'Prática', icon: '⌨️', color: 'text-[#10B981]' },
  EXERCISE: { label: 'Exercício', icon: '💪', color: 'text-[#FACC15]' },
  CHALLENGE: { label: 'Desafio', icon: '🏆', color: 'text-[#F97316]' },
  DEBUG_CHALLENGE: { label: 'Debug', icon: '🐛', color: 'text-[#F97316]' },
  CODE_REVIEW: { label: 'Code Review', icon: '👀', color: 'text-[#22D3EE]' },
  READING: { label: 'Leitura', icon: '📚', color: 'text-[#EC4899]' },
}

export default function CoursePage() {
  const totalLessons = MODULES.reduce((acc, m) => acc + m.lessons.length, 0)
  const totalHours = Math.round(MODULES.reduce((acc, m) => acc + m.lessons.reduce((a, l) => a + l.durationMin, 0), 0) / 60)

  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      {/* header */}
      <div className="relative overflow-hidden rounded-2xl border border-[#22D3EE]/15 bg-gradient-to-br from-[#0D1528] via-[#0F1B3A] to-[#111A32] p-6 md:p-7">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#3B82F6]/10 blur-3xl pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gradient-to-br from-[#22D3EE] to-[#3B82F6] items-center justify-center shrink-0 shadow-lg shadow-[#3B82F6]/20">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20 text-[#22D3EE]">
              <Sparkles className="w-3 h-3" /> Curso • 600h+ de conteúdo
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-3">Desenvolvimento FullStack</h1>
            <p className="text-sm text-[#94A3B8] mt-2 max-w-2xl">Do zero ao emprego: JavaScript, React, Node.js, banco de dados, testes, deploy e mais.</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.06] text-[#94A3B8]"><Clock className="w-3.5 h-3.5" /> {totalHours}h</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.06] text-[#94A3B8]"><Zap className="w-3.5 h-3.5" /> {totalLessons} aulas</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.06] text-[#94A3B8]"><CheckCircle className="w-3.5 h-3.5" /> {MODULES.length} módulos</span>
            </div>
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-5 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-white">Progresso Geral</span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.06] text-[#94A3B8]">0/{totalLessons} aulas</span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#10B981] w-0 transition-all" />
          </div>
        </div>
        <div className="text-2xl font-black text-white">0%</div>
      </div>

      {/* modules */}
      <div className="space-y-4">
        {MODULES.map((mod) => (
          <div key={mod.id} className="group rounded-2xl bg-[#0D1528] border border-white/[0.06] overflow-hidden hover:border-white/10 transition">
            <div className="p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-[#3B82F6]/20 flex items-center justify-center font-black text-[#22D3EE] shrink-0">
                {String(mod.order).padStart(2, '0')}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-white">{mod.title}</h2>
                <p className="text-xs text-[#94A3B8] truncate">{mod.description}</p>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <div className="text-xs text-[#64748B]">{mod.lessons.length} aulas</div>
                <div className="text-xs font-bold text-[#FACC15]">+{mod.xpReward} XP</div>
              </div>
            </div>

            <div className="px-5 pb-3">
              <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div className="h-full w-0 rounded-full bg-[#3B82F6] transition-all" />
              </div>
            </div>

            <div className="border-t border-white/[0.06]">
              {mod.lessons.map((lesson, i) => {
                const type = TYPE_LABELS[lesson.type] || TYPE_LABELS.THEORY
                return (
                  <Link
                    key={lesson.id}
                    href={`/aula/${lesson.id}`}
                    className={`flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.04] transition ${i < mod.lessons.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                  >
                    <Circle className="w-4 h-4 text-[#64748B] shrink-0" />
                    <span className="text-sm shrink-0">{type.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">{lesson.title}</div>
                      <div className="text-xs text-[#64748B]">{type.label} • {lesson.durationMin}min • <span className="text-[#FACC15]">+{lesson.xpReward} XP</span></div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-white transition shrink-0" />
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
