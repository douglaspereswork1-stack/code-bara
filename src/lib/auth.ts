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
      // Busca isPaid do DB no primeiro login do token
      if (token.sub && token.isPaid === undefined) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { isPaid: true },
        })
        ;(token as unknown as { isPaid: boolean }).isPaid = dbUser?.isPaid ?? false
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
