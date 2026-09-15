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

  const { lessonId, completed, timeSpent } = await req.json()

  if (!lessonId) {
    return NextResponse.json({ error: 'lessonId required' }, { status: 400 })
  }

  const progress = await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId,
        lessonId,
      },
    },
    update: {
      completed,
      completedAt: completed ? new Date() : null,
      timeSpentMin: timeSpent || 0,
    },
    create: {
      userId,
      lessonId,
      completed,
      completedAt: completed ? new Date() : null,
      timeSpentMin: timeSpent || 0,
    },
  })

  // Award XP if completed
  if (completed) {
    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } })
    if (lesson) {
      await prisma.xpRecord.upsert({
        where: { userId },
        update: { total: { increment: lesson.xpReward } },
        create: { userId, total: lesson.xpReward },
      })

      // Update streak
      await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/streak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })
    }
  }

  return NextResponse.json(progress)
}
