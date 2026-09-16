import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { hash, compare } from 'bcryptjs'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const { currentPassword, newPassword } = await req.json()

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Preencha todos os campos' }, { status: 400 })
  }

  if (newPassword.length < 6) {
    return NextResponse.json({ error: 'Nova senha deve ter no mínimo 6 caracteres' }, { status: 400 })
  }

  const userId = (session.user as unknown as { id: string }).id
  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user?.passwordHash) {
    return NextResponse.json({ error: 'Usuário sem senha configurada' }, { status: 400 })
  }

  const isValid = await compare(currentPassword, user.passwordHash)
  if (!isValid) {
    return NextResponse.json({ error: 'Senha atual incorreta' }, { status: 400 })
  }

  const newHash = await hash(newPassword, 12)
  await prisma.user.update({ where: { id: userId }, data: { passwordHash: newHash } })

  return NextResponse.json({ success: true })
}