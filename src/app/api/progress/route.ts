import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { touchStreak } from '@/lib/streak'
import { canAccessModule } from '@/lib/access'

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

  // Paywall por módulo — sem isso dá pra marcar aula premium como concluída e ganhar XP
  const isPaid = Boolean((session?.user as unknown as { isPaid?: boolean })?.isPaid)
  const lessonMeta = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { module: { select: { order: true } } },
  })
  if (!lessonMeta) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  if (!canAccessModule(lessonMeta.module.order, isPaid)) {
    return NextResponse.json({ error: 'Módulo não liberado' }, { status: 403 })
  }

  // Check if already completed to prevent double XP
  const existing = await prisma.progress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
    select: { completed: true },
  })

  const wasAlreadyCompleted = existing?.completed ?? false

  const progress = await prisma.progress.upsert({
    where: {
      userId_lessonId: { userId, lessonId },
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

  // Award XP only if completing for the first time
  if (completed && !wasAlreadyCompleted) {
    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } })
    if (lesson) {
      await prisma.xpRecord.upsert({
        where: { userId },
        update: { total: { increment: lesson.xpReward } },
        create: { userId, total: lesson.xpReward },
      })
      await touchStreak(userId)
    }
  }

  // If un-completing, remove XP
  if (!completed && wasAlreadyCompleted) {
    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } })
    if (lesson) {
      await prisma.xpRecord.update({
        where: { userId },
        data: { total: { decrement: lesson.xpReward } },
      })
    }
  }

  return NextResponse.json(progress)
}