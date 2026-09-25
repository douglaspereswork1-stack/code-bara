import { type NextRequest, NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { canAccessModule } from '@/lib/access'
import { parseQuizOptions } from '@/lib/quiz'

// Recebe { quizId, answers: number[] } (índice da opção escolhida por pergunta).
// Nota, gabarito e XP saem SÓ daqui — a página do quiz não recebe o `correct` das opções.
export async function POST(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = user.id

  const { quizId, answers } = await req.json()
  if (typeof quizId !== 'string' || !Array.isArray(answers)) {
    return NextResponse.json({ error: 'quizId and answers[] required' }, { status: 400 })
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: { orderBy: { order: 'asc' }, select: { options: true, explanation: true } },
      module: { select: { order: true } },
    },
  })
  if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
  if (!canAccessModule(quiz.module.order, user.isPaid)) {
    return NextResponse.json({ error: 'Módulo não liberado' }, { status: 403 })
  }

  const review = quiz.questions.map((q) => ({
    correctIdx: parseQuizOptions(q.options).findIndex((o) => o.correct),
    explanation: q.explanation,
  }))
  const correct = review.filter((r, i) => answers[i] === r.correctIdx).length
  const total = review.length
  const score = total > 0 ? Math.round((correct / total) * 100) : 0
  const passed = score >= quiz.passingScore

  // Passou = XP cheio, reprovou = 30%. O TETO por quiz é xpReward: refazer só paga a
  // diferença (reprovou 30% → passou recebe +70%), senão "Tentar Novamente" vira farm de XP.
  // ponytail: dois submits simultâneos podem pagar duas vezes — lock por usuário se virar problema.
  const potential = passed ? quiz.xpReward : Math.round(quiz.xpReward * 0.3)
  const prev = await prisma.quizResult.aggregate({ where: { userId, quizId }, _sum: { xpEarned: true } })
  const xpEarned = Math.max(0, potential - (prev._sum.xpEarned ?? 0))

  await prisma.quizResult.create({
    data: { userId, quizId, score, answers: JSON.stringify(answers), xpEarned },
  })
  if (xpEarned > 0) {
    await prisma.xpRecord.upsert({
      where: { userId },
      update: { total: { increment: xpEarned } },
      create: { userId, total: xpEarned },
    })
  }

  return NextResponse.json({ score, passed, correct, total, xpEarned, review })
}
