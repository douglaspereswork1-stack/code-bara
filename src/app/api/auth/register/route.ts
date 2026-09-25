import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hash } from 'bcryptjs'
import { normalizeEmail } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, password } = body
  const email = typeof body.email === 'string' ? normalizeEmail(body.email) : ''

  if (!email || typeof password !== 'string' || typeof name !== 'string' || !name.trim()) {
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
      name: name.trim(),
      email,
      passwordHash,
    },
  })

  return NextResponse.json({ userId: user.id })
}
