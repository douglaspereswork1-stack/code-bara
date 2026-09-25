import { NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { hash, compare } from 'bcryptjs'

export async function POST(req: Request) {
  const user = await getSessionUser()
  if (!user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { currentPassword, newPassword } = await req.json()

  if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' || !currentPassword) {
    return NextResponse.json({ error: 'Preencha todos os campos' }, { status: 400 })
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'Nova senha deve ter no mínimo 8 caracteres' }, { status: 400 })
  }

  const userId = user.id
  const dbUser = await prisma.user.findUnique({ where: { id: userId } })

  if (!dbUser?.passwordHash) {
    return NextResponse.json({ error: 'Usuário sem senha configurada' }, { status: 400 })
  }

  const isValid = await compare(currentPassword, dbUser.passwordHash)
  if (!isValid) {
    return NextResponse.json({ error: 'Senha atual incorreta' }, { status: 400 })
  }

  const newHash = await hash(newPassword, 12)
  await prisma.user.update({ where: { id: userId }, data: { passwordHash: newHash } })

  return NextResponse.json({ success: true })
}