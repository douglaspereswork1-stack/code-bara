import Credentials from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import { prisma } from '@/lib/db'
import { compare } from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.passwordHash) return null

        const isValid = await compare(credentials.password as string, user.passwordHash)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image ?? undefined,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        (session.user as unknown as { id: string }).id = token.sub
        ;(session.user as unknown as { isPaid: boolean }).isPaid = (token as unknown as { isPaid?: boolean }).isPaid ?? false
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id
      const t = token as unknown as { isPaid?: boolean; chk?: number }
      // Reconsulta o DB: sempre enquanto não pagou (vira true no request seguinte ao
      // webhook, sem relogar) e, pra quem já pagou, a cada 10 min — assim um usuário
      // apagado/bloqueado perde a sessão em minutos, não em 30 dias.
      const stale = !t.chk || Date.now() - t.chk > 10 * 60 * 1000
      if (token.sub && (!t.isPaid || stale)) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { isPaid: true },
        })
        if (!dbUser) return {} // token vazio = deslogado (middleware exige token.sub)
        t.isPaid = dbUser.isPaid
        t.chk = Date.now()
      }
      return token
    },
  },
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt' as const },
  secret: process.env.NEXTAUTH_SECRET,
}
