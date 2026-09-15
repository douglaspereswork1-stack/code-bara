import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { userId } = await req.json()

  if (!userId) {
    return NextResponse.json({ error: 'userId required' }, { status: 400 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const streak = await prisma.streak.findUnique({ where: { userId } })

  if (!streak) {
    // Create new streak
    const newStreak = await prisma.streak.create({
      data: {
        userId,
        current: 1,
        best: 1,
        lastStudyDate: today,
      },
    })
    return NextResponse.json(newStreak)
  }

  const lastStudy = streak.lastStudyDate
    ? new Date(streak.lastStudyDate)
    : null
  lastStudy?.setHours(0, 0, 0, 0)

  const diffDays = lastStudy
    ? Math.floor((today.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24))
    : null

  let newCurrent = streak.current
  let newBest = streak.best

  if (diffDays === null || diffDays > 0) {
    // Study today for the first time
    if (diffDays === 1) {
      // Consecutive day
      newCurrent = streak.current + 1
    } else if (diffDays === null || diffDays > 1) {
      // Streak broken
      newCurrent = 1
    }
    newBest = Math.max(newBest, newCurrent)
  }
  // If diffDays === 0, already studied today, no change

  const updated = await prisma.streak.update({
    where: { userId },
    data: {
      current: newCurrent,
      best: newBest,
      lastStudyDate: today,
    },
  })

  return NextResponse.json(updated)
}
