import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import QuizClient from './QuizClient'

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  const quiz = await prisma.quiz.findUnique({
    where: { id },
    include: {
      questions: { orderBy: { order: 'asc' } },
      module: {
        include: {
          course: { select: { slug: true } },
        },
      },
    },
  })

  if (!quiz) notFound()

  return (
    <QuizClient
      quiz={{
        id: quiz.id,
        title: quiz.title,
        passingScore: quiz.passingScore,
        xpReward: quiz.xpReward,
        questions: quiz.questions.map(q => ({
          id: q.id,
          question: q.question,
          options: q.options as unknown as string[],
          explanation: q.explanation,
          order: q.order,
        })),
      }}
      moduleSlug={quiz.module.slug}
      courseSlug={quiz.module.course.slug}
    />
  )
}
