import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { canAccessModule } from '@/lib/access'
import { outputMatches, parseExpected } from '@/lib/exercise'
import { touchStreak } from '@/lib/streak'

// O client manda só { exerciseId, output }. Gabarito, XP e paywall vêm do banco.
// ponytail: output é auto-reportado pelo browser (dá pra colar a resposta) — executar no
// servidor exige sandbox (Vercel Sandbox). Fecha o buraco que importa: XP arbitrário / exercício inexistente.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const user = session?.user as unknown as { id?: string; isPaid?: boolean } | undefined
  if (!user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = user.id

  const { exerciseId, output } = await req.json()
  if (typeof exerciseId !== 'string' || !Array.isArray(output)) {
    return NextResponse.json({ error: 'exerciseId and output[] required' }, { status: 400 })
  }

  const exercise = await prisma.exercise.findUnique({
    where: { id: exerciseId },
    include: { lesson: { select: { module: { select: { order: true } } } } },
  })
  if (!exercise) return NextResponse.json({ error: 'Exercise not found' }, { status: 404 })
  if (!canAccessModule(exercise.lesson.module.order, Boolean(user.isPaid))) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const expected = parseExpected(exercise.testCases)
  const actual = output.slice(0, 200).map(String)
  if (!outputMatches(expected, actual)) {
    return NextResponse.json({ ok: true, passed: false, expected })
  }

  const xpRecord = await prisma.xpRecord.upsert({ where: { userId }, update: {}, create: { userId, total: 0 } })
  const awarded: string[] = JSON.parse(xpRecord.awardedExercises || '[]')
  if (awarded.includes(exerciseId)) {
    return NextResponse.json({ ok: true, passed: true, alreadyAwarded: true, total: xpRecord.total })
  }

  awarded.push(exerciseId)
  const total = xpRecord.total + exercise.xpReward
  const level = Math.floor(total / 500) + 1
  await prisma.xpRecord.update({
    where: { userId },
    data: { total, level, awardedExercises: JSON.stringify(awarded) },
  })
  await touchStreak(userId)

  return NextResponse.json({ ok: true, passed: true, xpEarned: exercise.xpReward, total, level })
}
