import { notFound, redirect } from 'next/navigation'
import { getSessionUser } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { canAccessModule } from '@/lib/access'
import { parseQuizOptions } from '@/lib/quiz'
import QuizClient from './QuizClient'

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getSessionUser()

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

  if (!canAccessModule(quiz.module.order, Boolean(user?.isPaid))) redirect('/pagamento?bloqueado=quiz')

  return (
    <QuizClient
      quiz={{
        id: quiz.id,
        title: quiz.title,
        passingScore: quiz.passingScore,
        xpReward: quiz.xpReward,
        // só o texto: `correct` e a explicação vêm na resposta do POST /api/quiz
        questions: quiz.questions.map(q => ({
          id: q.id,
          question: q.question,
          options: parseQuizOptions(q.options).map(o => o.text),
        })),
      }}
      courseSlug={quiz.module.course.slug}
    />
  )
}
