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
          lessons: { orderBy: { order: 'asc' }, select: { id: true, title: true, order: true } },
          course: { select: { slug: true } },
        },
      },
    },
  })

  if (!lesson) notFound()

  const currentIndex = lesson.module.lessons.findIndex(l => l.id === id)
  const prevLesson = currentIndex > 0 ? lesson.module.lessons[currentIndex - 1] : null
  const nextLesson = currentIndex < lesson.module.lessons.length - 1 ? lesson.module.lessons[currentIndex + 1] : null

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