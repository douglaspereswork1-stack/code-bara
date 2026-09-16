import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const { userId } = await req.json()
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 })

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const streak = await prisma.streak.findUnique({ where: { userId } })

  if (!streak) {
    await prisma.streak.create({
      data: { userId, current: 1, best: 1, lastStudyDate: today },
    })
    return NextResponse.json({ current: 1, best: 1 })
  }

  const last = streak.lastStudyDate ? new Date(streak.lastStudyDate) : null
  if (last) last.setHours(0, 0, 0, 0)

  const diffDays = last ? Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)) : 999

  let current = streak.current
  let best = streak.best

  if (diffDays === 0) {
    // Already studied today, no change
  } else if (diffDays === 1) {
    current += 1
    if (current > best) best = current
  } else {
    current = 1
  }

  await prisma.streak.update({
    where: { userId },
    data: { current, best, lastStudyDate: today },
  })

  return NextResponse.json({ current, best })
}
