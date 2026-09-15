import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!(session?.user as unknown as { id: string })?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const userId = (session!.user as unknown as { id: string }).id

  const { quizId, answers } = await req.json()

  if (!quizId || !answers) {
    return NextResponse.json({ error: 'quizId and answers required' }, { status: 400 })
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: { questions: true },
  })

  if (!quiz) {
    return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })
  }

  let correct = 0
  const results = quiz.questions.map((q: { id: string; options: unknown }, i: number) => {
    const selected = answers[i]
    const options = q.options as Array<{ text: string; isCorrect: boolean }>
    const isCorrect = options.find(o => o.text === selected)?.isCorrect || false
    if (isCorrect) correct++
    return { questionId: q.id, selectedOption: selected, correct: isCorrect }
  })

  const score = Math.round((correct / quiz.questions.length) * 100)
  const passed = score >= quiz.passingScore
  const xpEarned = passed ? quiz.xpReward : 0

  await prisma.quizResult.create({
    data: {
      userId,
      quizId,
      score,
      answers: JSON.stringify(results),
      xpEarned,
    },
  })

  if (passed && xpEarned > 0) {
    await prisma.xpRecord.upsert({
      where: { userId },
      update: { total: { increment: xpEarned } },
      create: { userId, total: xpEarned },
    })
  }

  return NextResponse.json({
    score,
    passed,
    xpEarned,
    results,
    totalQuestions: quiz.questions.length,
    correct,
  })
}
