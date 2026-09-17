import Link from 'next/link'
import { CheckCircle, Circle, Clock, Zap, ChevronRight, Code2, Sparkles, Award, HelpCircle, Lock } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { canAccessModule, isFreeModule } from '@/lib/access'

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

export default async function CoursePage() {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as unknown as { id: string })?.id
  const isPaid = Boolean((session?.user as unknown as { isPaid?: boolean })?.isPaid)

  const course = await prisma.course.findUnique({
    where: { slug: 'dev-fullstack' },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: { orderBy: { order: 'asc' } },
          quizzes: { include: { results: userId ? { where: { userId } } : false } },
        },
      },
    },
  })

  if (!course) {
    return <div className="p-6 text-white">Curso não encontrado.</div>
  }

  const allLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id))

  const completedLessons = userId
    ? await prisma.progress.findMany({
        where: { userId, lessonId: { in: allLessonIds }, completed: true },
        select: { lessonId: true },
      })
    : []

  const completedSet = new Set(completedLessons.map(p => p.lessonId))
  const totalLessons = allLessonIds.length
  const completedCount = completedSet.size
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  const totalMinutes = course.modules.reduce(
    (acc, m) => acc + m.lessons.reduce((a, l) => a + l.durationMin, 0), 0
  )
  const totalHours = Math.round(totalMinutes / 60)

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
              <Sparkles className="w-3 h-3" /> Curso • {totalHours}h+ de conteúdo
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-3">{course.title}</h1>
            <p className="text-sm text-[#94A3B8] mt-2 max-w-2xl">{course.description}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.06] text-[#94A3B8]"><Clock className="w-3.5 h-3.5" /> {totalHours}h</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.06] text-[#94A3B8]"><Zap className="w-3.5 h-3.5" /> {totalLessons} aulas</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.06] text-[#94A3B8]"><CheckCircle className="w-3.5 h-3.5" /> {course.modules.length} módulos</span>
            </div>
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-5 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-white">Progresso Geral</span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.06] text-[#94A3B8]">{completedCount}/{totalLessons} aulas</span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#10B981] transition-all" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
        <div className="text-2xl font-black text-white">{progressPercent}%</div>
      </div>

      {/* upgrade (só quem ainda não pagou) */}
      {!isPaid && (
        <Link href="/pagamento" className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#FACC15]/30 bg-[#FACC15]/[0.06] p-4 hover:bg-[#FACC15]/10 transition">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FACC15]/15 text-[#FACC15] text-[11px] font-bold uppercase tracking-wide">🔥 Promoção de lançamento</span>
          <span className="text-sm text-white flex-1 min-w-[200px]">
            O módulo 1 é <span className="font-bold text-[#10B981]">grátis</span>. Desbloqueie os outros {course.modules.filter(m => !isFreeModule(m.order)).length} módulos por <span className="font-black"><span className="text-[#FACC15]">12x</span> de R$ 75</span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-[#FACC15]">Desbloquear <ChevronRight className="w-4 h-4" /></span>
        </Link>
      )}

      {/* modules */}
      <div className="space-y-4">
        {course.modules.map((mod) => {
          const modCompleted = mod.lessons.filter(l => completedSet.has(l.id)).length
          const modTotal = mod.lessons.length
          const modPercent = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0
          const isModComplete = modCompleted === modTotal && modTotal > 0
          const quiz = mod.quizzes[0]
          const quizResult = quiz?.results[0]
          const hasCertificate = isModComplete
          const locked = !canAccessModule(mod.order, isPaid)
          const free = isFreeModule(mod.order)

          return (
            <div key={mod.id} className={`group rounded-2xl bg-[#0D1528] border border-white/[0.06] overflow-hidden hover:border-white/10 transition ${locked ? 'opacity-75' : ''}`}>
              <div className="p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 border border-[#3B82F6]/20 flex items-center justify-center font-black text-[#22D3EE] shrink-0">
                  {locked ? <Lock className="w-4 h-4 text-[#94A3B8]" /> : String(mod.order).padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-white flex items-center gap-2">
                    {mod.title}
                    {free && !isPaid && <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">Grátis</span>}
                    {locked && <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#FACC15]/15 text-[#FACC15] border border-[#FACC15]/30">Premium</span>}
                  </h2>
                  <p className="text-xs text-[#94A3B8] truncate">{mod.description}</p>
                </div>
                <div className="hidden sm:block text-right shrink-0">
                  <div className="text-xs text-[#64748B]">{modCompleted}/{modTotal} aulas</div>
                  <div className="text-xs font-bold text-[#FACC15]">+{mod.xpReward} XP</div>
                </div>
              </div>

              <div className="px-5 pb-3">
                <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-[#3B82F6] transition-all" style={{ width: `${modPercent}%` }} />
                </div>
              </div>

              <div className="border-t border-white/[0.06]">
                {mod.lessons.map((lesson, i) => {
                  const type = TYPE_LABELS[lesson.type] || TYPE_LABELS.THEORY
                  const done = completedSet.has(lesson.id)
                  return (
                    <Link
                      key={lesson.id}
                      href={locked ? '/pagamento' : `/aula/${lesson.id}`}
                      className={`flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.04] transition ${i < mod.lessons.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                    >
                      {locked
                        ? <Lock className="w-4 h-4 text-[#64748B] shrink-0" />
                        : done
                          ? <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                          : <Circle className="w-4 h-4 text-[#64748B] shrink-0" />
                      }
                      <span className="text-sm shrink-0">{type.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${done ? 'text-[#10B981]' : 'text-white'}`}>{lesson.title}</div>
                        <div className="text-xs text-[#64748B]">{type.label} • {lesson.durationMin}min • <span className="text-[#FACC15]">+{lesson.xpReward} XP</span></div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-white transition shrink-0" />
                    </Link>
                  )
                })}

                {/* Quiz row */}
                {quiz && (
                  <Link
                    href={locked ? '/pagamento' : `/quiz/${quiz.id}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.04] transition border-t border-white/[0.06]"
                  >
                    {locked ? (
                      <Lock className="w-4 h-4 text-[#64748B] shrink-0" />
                    ) : quizResult ? (
                      <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-[#F97316] shrink-0" />
                    )}
                    <span className="text-sm shrink-0">📝</span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${quizResult ? 'text-[#10B981]' : 'text-white'}`}>
                        {quiz.title}
                      </div>
                      <div className="text-xs text-[#64748B]">
                        {quizResult
                          ? `Nota: ${quizResult.score}% • +${quizResult.xpEarned} XP`
                          : `5 perguntas • +${quiz.xpReward} XP`
                        }
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#64748B] group-hover:text-white transition shrink-0" />
                  </Link>
                )}

                {/* Certificate row */}
                {hasCertificate && (
                  <a
                    href={`/api/certificate?moduleId=${mod.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.04] transition border-t border-[#FACC15]/20 bg-[#FACC15]/[0.02]"
                  >
                    <Award className="w-4 h-4 text-[#FACC15] shrink-0" />
                    <span className="text-sm shrink-0">🎓</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#FACC15]">Certificado de Conclusão</div>
                      <div className="text-xs text-[#64748B]">Baixe seu certificado HTML</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#FACC15] group-hover:text-white transition shrink-0" />
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
