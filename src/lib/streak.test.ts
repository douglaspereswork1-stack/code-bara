import { describe, expect, it, vi } from 'vitest'
import { daysSince, studyDay, touchStreak } from './streak'
const db = vi.hoisted(() => ({ findUnique: vi.fn(), update: vi.fn(), create: vi.fn() }))
vi.mock('./db', () => ({ prisma: { streak: db } }))

// BRT = UTC-3 (sem horário de verão desde 2019)
const brt = (iso: string) => new Date(`${iso}-03:00`)

describe('studyDay', () => {
  it('23:30 BRT é o mesmo dia de 10:00 BRT (já é dia seguinte em UTC)', () => {
    expect(studyDay(brt('2026-10-29T23:30:00'))).toEqual(studyDay(brt('2026-10-29T10:00:00')))
    expect(studyDay(brt('2026-10-29T23:30:00')).toISOString()).toBe('2026-10-29T00:00:00.000Z')
  })
  it('00:30 BRT do dia seguinte conta como dia seguinte', () => {
    const ontem = studyDay(brt('2026-10-29T23:30:00'))
    const hoje = studyDay(brt('2026-10-30T00:30:00'))
    expect(daysSince(ontem, hoje)).toBe(1)
  })
})

describe('daysSince com registro antigo (meia-noite UTC)', () => {
  it('ontem UTC → 1, hoje UTC → 0', () => {
    const hoje = studyDay(brt('2026-10-30T10:00:00'))
    expect(daysSince(new Date('2026-10-29T00:00:00Z'), hoje)).toBe(1)
    expect(daysSince(new Date('2026-10-30T00:00:00Z'), hoje)).toBe(0)
  })
})

describe('touchStreak na transição (registro antigo 1 dia à frente)', () => {
  it('diffDays -1 = mesmo dia: não zera e não recua lastStudyDate', async () => {
    vi.useFakeTimers({ now: brt('2026-10-28T23:00:00') })
    const antigo = new Date('2026-10-29T00:00:00Z') // gravado às 21h+ BRT de 28/10 pelo código velho
    db.findUnique.mockResolvedValue({ userId: 'u', current: 5, best: 7, lastStudyDate: antigo })
    expect(await touchStreak('u')).toEqual({ current: 5, best: 7 })
    expect(db.update).toHaveBeenCalledWith({ where: { userId: 'u' }, data: { current: 5, best: 7, lastStudyDate: antigo } })
    vi.useRealTimers()
  })
})
