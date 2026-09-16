import Link from 'next/link'
import { BookOpen, Code2, ClipboardCheck, ArrowRight } from 'lucide-react'
import { prisma } from '@/lib/db'

export async function ContinueLearning({ userId, completed, total, progress }: { userId?: string; completed: number; total: number; progress: number }) {
  let nextLesson: { id: string; title: string; moduleTitle: string } | null = null
  let nextQuiz: { id: string; title: string } | null = null

  if (userId) {
    const course = await prisma.course.findUnique({
      where: { slug: 'dev-fullstack' },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: { orderBy: { order: 'asc' }, select: { id: true, title: true } },
            quizzes: { select: { id: true, title: true } },
          },
        },
      },
    })

    if (course) {
      const completedLessons = await prisma.progress.findMany({
        where: { userId, completed: true },
        select: { lessonId: true },
      })
      const completedSet = new Set(completedLessons.map(p => p.lessonId))

      // Find next incomplete lesson
      for (const mod of course.modules) {
        for (const lesson of mod.lessons) {
          if (!completedSet.has(lesson.id)) {
            nextLesson = { id: lesson.id, title: lesson.title, moduleTitle: mod.title }
            break
          }
        }
        if (nextLesson) break
      }

      // Find first quiz not yet taken or with low score
      for (const mod of course.modules) {
        for (const quiz of mod.quizzes) {
          const result = await prisma.quizResult.findFirst({
            where: { userId, quizId: quiz.id },
            select: { score: true },
          })
          if (!result || result.score < 60) {
            nextQuiz = { id: quiz.id, title: quiz.title }
            break
          }
        }
        if (nextQuiz) break
      }
    }
  }

  return (
    <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-white text-sm tracking-wide">CONTINUAR ESTUDANDO</h2>
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.06] text-[#94A3B8]">
          {completed}/{total} aulas
        </span>
      </div>

      <div className="mt-4 h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#10B981] transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="text-right text-xs text-[#64748B] mt-1">{completed}/{total} aulas</div>

      <div className="mt-4 flex items-center gap-3 text-[11px] text-[#94A3B8]">
        <span className="flex items-center gap-1.5"><span className="w-6 h-6 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center"><BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" /></span> Aula</span>
        <span className="flex items-center gap-1.5"><span className="w-6 h-6 rounded-lg bg-[#10B981]/15 border border-[#10B981]/20 flex items-center justify-center"><ClipboardCheck className="w-3.5 h-3.5 text-[#10B981]" /></span> Quiz</span>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-4">
        {nextLesson ? (
          <Link
            href={`/aula/${nextLesson.id}`}
            className="group relative rounded-xl bg-gradient-to-br from-[#111A32] to-[#0D1528] border border-[#3B82F6]/20 p-5 hover:border-[#3B82F6]/40 hover:-translate-y-0.5 transition-all flex flex-col"
          >
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div className="mt-3 text-xs font-semibold tracking-widest uppercase text-[#3B82F6]">{nextLesson.moduleTitle}</div>
            <div className="font-bold text-white">{nextLesson.title}</div>
            <div className="mt-3 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div className="h-full w-0 rounded-full bg-[#3B82F6]" />
            </div>
            <ArrowRight className="absolute top-4 right-4 w-4 h-4 text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 transition" />
          </Link>
        ) : (
          <Link
            href="/curso/dev-fullstack"
            className="group relative rounded-xl bg-gradient-to-br from-[#111A32] to-[#0D1528] border border-[#10B981]/20 p-5 hover:border-[#10B981]/40 hover:-translate-y-0.5 transition-all flex flex-col"
          >
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="mt-3 text-xs font-semibold tracking-widest uppercase text-[#10B981]">COMPLETO</div>
            <div className="font-bold text-white">Todas as aulas feitas!</div>
            <ArrowRight className="absolute top-4 right-4 w-4 h-4 text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 transition" />
          </Link>
        )}

        {nextQuiz ? (
          <Link
            href={`/quiz/${nextQuiz.id}`}
            className="group relative rounded-xl bg-[#111A32] border border-white/[0.06] p-5 hover:border-white/10 hover:-translate-y-0.5 transition-all flex flex-col justify-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/20 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <div className="font-semibold text-white mt-3">{nextQuiz.title}</div>
            <div className="text-xs text-[#94A3B8] mt-1">5 perguntas • 10 min</div>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE]">Começar <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" /></span>
          </Link>
        ) : (
          <Link
            href="/curso/dev-fullstack"
            className="group relative rounded-xl bg-[#111A32] border border-white/[0.06] p-5 hover:border-white/10 hover:-translate-y-0.5 transition-all flex flex-col justify-center"
          >
            <div className="w-10 h-10 rounded-xl bg-[#10B981]/15 border border-[#10B981]/20 flex items-center justify-center">
              <ClipboardCheck className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="font-semibold text-white mt-3">Todos os quizzes feitos!</div>
            <div className="text-xs text-[#94A3B8] mt-1">Revise o conteúdo</div>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#22D3EE]">Revisar <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" /></span>
          </Link>
        )}
      </div>
    </div>
  )
}
