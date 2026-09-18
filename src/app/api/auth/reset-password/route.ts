import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { token, password } = await req.json()

  if (!token || !password) {
    return NextResponse.json({ error: 'Token e senha obrigatórios' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Senha deve ter no mínimo 8 caracteres' }, { status: 400 })
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  })

  if (!user) {
    return NextResponse.json({ error: 'Token inválido ou expirado' }, { status: 400 })
  }

  const passwordHash = await hash(password, 12)

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash,
      resetToken: null,
      resetTokenExpiry: null,
    },
  })

  return NextResponse.json({ ok: true })
}
