import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as unknown as { id: string })?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { quizId, score, answers, xpEarned } = await req.json()

  if (!quizId || typeof score !== 'number') {
    return NextResponse.json({ error: 'quizId and score required' }, { status: 400 })
  }

  const quiz = await prisma.quiz.findUnique({ where: { id: quizId } })
  if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 })

  const result = await prisma.quizResult.create({
    data: {
      userId,
      quizId,
      score,
      answers: JSON.stringify(answers),
      xpEarned,
    },
  })

  // Award XP
  if (xpEarned > 0) {
    await prisma.xpRecord.upsert({
      where: { userId },
      update: { total: { increment: xpEarned } },
      create: { userId, total: xpEarned },
    })
  }

  return NextResponse.json(result)
}
