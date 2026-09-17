import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { canAccessModule } from '@/lib/access'

// Recebe { quizId, answers: number[] } (índice da opção escolhida por pergunta).
// A NOTA E O XP SÃO CALCULADOS AQUI — o que o cliente mandar em score/xpEarned é ignorado,
// senão qualquer um faz POST {xpEarned: 99999} e lidera o ranking.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as unknown as { id: string })?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const isPaid = Boolean((session?.user as unknown as { isPaid?: boolean })?.isPaid)

  const { quizId, answers } = await req.json()

  if (!quizId || !Array.isArray(answers)) {
    return NextResponse.json({ error: 'quizId and answers[] required' }, { status: 400 })
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: { orderBy: { order: 'asc' }, select: { options: true } },
      module: { select: { order: true } },
    },
  })
  if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
  if (!canAccessModule(quiz.module.order, isPaid)) {
    return NextResponse.json({ error: 'Módulo não liberado' }, { status: 403 })
  }

  let correct = 0
  quiz.questions.forEach((q, i) => {
    const options = JSON.parse(q.options as unknown as string) as Array<{ text: string; correct: boolean }>
    const idx = answers[i]
    if (typeof idx === 'number' && options[idx]?.correct) correct++
  })

  const total = quiz.questions.length
  const score = total > 0 ? Math.round((correct / total) * 100) : 0
  const passed = score >= quiz.passingScore
  // Mesma regra que o QuizClient mostra na tela: passou = XP cheio, reprovou = 30%
  const xpEarned = passed ? quiz.xpReward : Math.round(quiz.xpReward * 0.3)

  const result = await prisma.quizResult.create({
    data: {
      userId,
      quizId,
      score,
      answers: JSON.stringify(answers),
      xpEarned,
    },
  })

  if (xpEarned > 0) {
    await prisma.xpRecord.upsert({
      where: { userId },
      update: { total: { increment: xpEarned } },
      create: { userId, total: xpEarned },
    })
  }

  return NextResponse.json({ ...result, passed, correct, total })
}
