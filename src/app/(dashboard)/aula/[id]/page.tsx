import { notFound, redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { canAccessModule } from '@/lib/access'
import LessonClient from './LessonClient'

// Linguagem do console por módulo (sql = sqlite em memória dentro do Pyodide, dataset fixo no worker)
const LANGUAGE_BY_MODULE: Record<string, string> = { python: 'python', 'banco-dados': 'sql' }

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  const userId = (session?.user as unknown as { id: string })?.id

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      exercises: { orderBy: { order: 'asc' } },
      module: {
        include: {
          course: {
            include: {
              modules: {
                orderBy: { order: 'asc' },
                include: {
                  lessons: { orderBy: { order: 'asc' }, select: { id: true, title: true, order: true } },
                },
              },
            },
          },
        },
      },
    },
  })

  if (!lesson) notFound()

  // Paywall por módulo (o middleware só barra rotas 100% pagas)
  const isPaid = Boolean((session?.user as unknown as { isPaid?: boolean })?.isPaid)
  if (!canAccessModule(lesson.module.order, isPaid)) redirect('/pagamento?bloqueado=aula')

  // Flatten all lessons across all modules for prev/next navigation
  const allLessons = lesson.module.course.modules.flatMap(m => m.lessons)
  const flatIndex = allLessons.findIndex(l => l.id === id)
  const prevLesson = flatIndex > 0 ? allLessons[flatIndex - 1] : null
  const nextLesson = flatIndex < allLessons.length - 1 ? allLessons[flatIndex + 1] : null

  let completed = false
  if (userId) {
    const progress = await prisma.progress.findUnique({
      where: { userId_lessonId: { userId, lessonId: id } },
      select: { completed: true },
    })
    completed = progress?.completed ?? false
  }

  return (
    <LessonClient
      lesson={{
        id: lesson.id,
        title: lesson.title,
        type: lesson.type,
        content: lesson.content,
        durationMin: lesson.durationMin,
        xpReward: lesson.xpReward,
      }}
      exercises={lesson.exercises.map((e) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        starterCode: e.starterCode,
        xpReward: e.xpReward,
        // gabarito (solution/testCases) NÃO vai pro client — validação é em /api/progress/exercise
        // ponytail: linguagem pelo slug do módulo; coluna Exercise.language quando um módulo misturar
        language: LANGUAGE_BY_MODULE[lesson.module.slug] ?? 'javascript',
      }))}
      courseSlug={lesson.module.course.slug}
      prevLessonId={prevLesson?.id ?? null}
      nextLessonId={nextLesson?.id ?? null}
      initialCompleted={completed}
    />
  )
}