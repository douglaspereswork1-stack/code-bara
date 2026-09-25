import Credentials from 'next-auth/providers/credentials'
import { getServerSession, type NextAuthOptions } from 'next-auth'
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
          where: { email: normalizeEmail(credentials.email) },
        })

        if (!user || !user.passwordHash) return null

        const isValid = await compare(credentials.password, user.passwordHash)
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
        session.user.id = token.sub
        session.user.isPaid = token.isPaid ?? false
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id
      // Reconsulta o DB: sempre enquanto não pagou (vira true no request seguinte ao
      // webhook, sem relogar) e, pra quem já pagou, a cada 10 min — assim um usuário
      // apagado/bloqueado perde a sessão em minutos, não em 30 dias.
      const stale = !token.chk || Date.now() - token.chk > 10 * 60 * 1000
      if (token.sub && (!token.isPaid || stale)) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { isPaid: true },
        })
        if (!dbUser) return {} // token vazio = deslogado (middleware exige token.sub)
        token.isPaid = dbUser.isPaid
        token.chk = Date.now()
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

export const normalizeEmail = (email: string) => email.trim().toLowerCase()

// Usuário logado (id + isPaid) ou null. Rotas e páginas server usam isto, nunca o cast manual.
export async function getSessionUser() {
  const session = await getServerSession(authOptions)
  return session?.user?.id ? session.user : null
}
