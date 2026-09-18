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

  const { exerciseId, xpReward } = await req.json()

  if (!exerciseId || typeof xpReward !== 'number') {
    return NextResponse.json({ error: 'exerciseId and xpReward required' }, { status: 400 })
  }

  // Get or create XpRecord
  const xpRecord = await prisma.xpRecord.upsert({
    where: { userId },
    update: {},
    create: { userId, total: 0 },
  })

  // Check if already awarded
  const awarded: string[] = JSON.parse(xpRecord.awardedExercises || '[]')
  if (awarded.includes(exerciseId)) {
    return NextResponse.json({ ok: true, alreadyAwarded: true, total: xpRecord.total })
  }

  // Award XP
  awarded.push(exerciseId)
  const newTotal = xpRecord.total + xpReward
  const newLevel = Math.floor(newTotal / 500) + 1

  await prisma.xpRecord.update({
    where: { userId },
    data: {
      total: newTotal,
      level: newLevel,
      awardedExercises: JSON.stringify(awarded),
    },
  })

  return NextResponse.json({ ok: true, xpEarned: xpReward, total: newTotal, level: newLevel })
}
