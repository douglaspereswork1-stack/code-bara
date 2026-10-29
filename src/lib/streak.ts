import { prisma } from './db' // relativo: vitest não resolve o alias @/

const brtDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' })

// "Dia de estudo" = data civil em America/Sao_Paulo, gravada como meia-noite UTC dessa data
// (o servidor roda em UTC na Vercel: setHours(0,0,0,0) virava o dia às 21h BRT).
export function studyDay(now: Date): Date {
  return new Date(`${brtDate.format(now)}T00:00:00Z`) // en-CA → "YYYY-MM-DD"
}

// Dias entre o lastStudyDate gravado e hoje (studyDay). Lê o gravado pela data UTC:
// registros novos são meia-noite UTC da data BRT; os antigos, meia-noite UTC (Vercel) ou local (dev).
export function daysSince(last: Date, today: Date): number {
  const lastDay = Date.UTC(last.getUTCFullYear(), last.getUTCMonth(), last.getUTCDate())
  return Math.round((today.getTime() - lastDay) / 86400000)
}

// Registra "estudou hoje". Chamado direto pelas rotas (antes era self-fetch em /api/streak sem sessão).
export async function touchStreak(userId: string) {
  const today = studyDay(new Date())

  const streak = await prisma.streak.findUnique({ where: { userId } })
  if (!streak) {
    await prisma.streak.create({ data: { userId, current: 1, best: 1, lastStudyDate: today } })
    return { current: 1, best: 1 }
  }

  const diffDays = streak.lastStudyDate ? daysSince(new Date(streak.lastStudyDate), today) : 999

  let { current, best } = streak
  if (diffDays === 1) {
    current += 1
    if (current > best) best = current
  } else if (diffDays > 1) {
    current = 1
  }

  // diffDays < 0 só na transição: registro antigo (UTC) gravado entre 21h e 24h BRT fica 1 dia à frente — mesmo dia, não recua a data
  const lastStudyDate = diffDays < 0 ? streak.lastStudyDate : today
  await prisma.streak.update({ where: { userId }, data: { current, best, lastStudyDate } })
  return { current, best }
}
