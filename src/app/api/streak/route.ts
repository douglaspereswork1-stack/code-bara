import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { touchStreak } from '@/lib/streak'

// userId vem da sessão, nunca do body (antes qualquer um alterava o streak de qualquer id)
export async function POST() {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as unknown as { id?: string } | undefined)?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(await touchStreak(userId))
}
