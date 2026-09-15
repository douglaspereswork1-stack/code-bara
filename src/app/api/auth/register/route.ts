import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json()

  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Nome, email e senha obrigatórios' }, { status: 400 })
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Senha deve ter no mínimo 8 caracteres' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Email já cadastrado' }, { status: 409 })
  }

  const passwordHash = await hash(password, 12)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  })

  return NextResponse.json({ userId: user.id })
}
