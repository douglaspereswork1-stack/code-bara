import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: 'Email obrigatório' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })

  // Sempre retorna sucesso pra não revelar se o email existe
  if (!user) {
    return NextResponse.json({ ok: true })
  }

  const token = crypto.randomBytes(32).toString('hex')
  const expiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hora

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiry: expiry },
  })

  const resetUrl = `${req.nextUrl.origin}/reset-password?token=${token}`

  // Log no servidor pra debug (em prod, integrar email)
  console.log(`[forgot-password] Reset link para ${email}: ${resetUrl}`)

  return NextResponse.json({ ok: true })
}
