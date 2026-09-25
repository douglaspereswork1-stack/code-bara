import { type NextRequest, NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { touchStreak } from '@/lib/streak'
import { canAccessModule } from '@/lib/access'

export async function POST(req: NextRequest) {
  const user = await getSessionUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = user.id

  const { lessonId, completed, timeSpent } = await req.json()
  if (typeof lessonId !== 'string' || typeof completed !== 'boolean') {
    return NextResponse.json({ error: 'lessonId and completed required' }, { status: 400 })
  }

  // Paywall por módulo — sem isso dá pra marcar aula premium como concluída e ganhar XP
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { xpReward: true, module: { select: { order: true } } },
  })
  if (!lesson) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })
  if (!canAccessModule(lesson.module.order, user.isPaid)) {
    return NextResponse.json({ error: 'Módulo não liberado' }, { status: 403 })
  }

  const existing = await prisma.progress.findUnique({
    where: { userId_lessonId: { userId, lessonId } },
    select: { completed: true },
  })
  const wasAlreadyCompleted = existing?.completed ?? false

  const data = {
    completed,
    completedAt: completed ? new Date() : null,
    timeSpentMin: Number(timeSpent) || 0,
  }
  const progress = await prisma.progress.upsert({
    where: { userId_lessonId: { userId, lessonId } },
    update: data,
    create: { userId, lessonId, ...data },
  })

  // XP só na primeira conclusão; desmarcar devolve o XP
  if (completed && !wasAlreadyCompleted) {
    await prisma.xpRecord.upsert({
      where: { userId },
      update: { total: { increment: lesson.xpReward } },
      create: { userId, total: lesson.xpReward },
    })
    await touchStreak(userId)
  } else if (!completed && wasAlreadyCompleted) {
    await prisma.xpRecord.update({
      where: { userId },
      data: { total: { decrement: lesson.xpReward } },
    })
  }

  return NextResponse.json(progress)
}
