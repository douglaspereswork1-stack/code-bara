import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import LessonClient from './LessonClient'

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  const userId = (session?.user as unknown as { id: string })?.id

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
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
      courseSlug={lesson.module.course.slug}
      prevLessonId={prevLesson?.id ?? null}
      nextLessonId={nextLesson?.id ?? null}
      initialCompleted={completed}
    />
  )
}