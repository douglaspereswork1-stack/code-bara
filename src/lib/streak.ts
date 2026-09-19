import { prisma } from '@/lib/db'

// Registra "estudou hoje". Chamado direto pelas rotas (antes era self-fetch em /api/streak sem sessão).
export async function touchStreak(userId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const streak = await prisma.streak.findUnique({ where: { userId } })
  if (!streak) {
    await prisma.streak.create({ data: { userId, current: 1, best: 1, lastStudyDate: today } })
    return { current: 1, best: 1 }
  }

  const last = streak.lastStudyDate ? new Date(streak.lastStudyDate) : null
  if (last) last.setHours(0, 0, 0, 0)
  const diffDays = last ? Math.floor((today.getTime() - last.getTime()) / 86400000) : 999

  let { current, best } = streak
  if (diffDays === 1) {
    current += 1
    if (current > best) best = current
  } else if (diffDays !== 0) {
    current = 1
  }

  await prisma.streak.update({ where: { userId }, data: { current, best, lastStudyDate: today } })
  return { current, best }
}
