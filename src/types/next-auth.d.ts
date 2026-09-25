import type { DefaultSession } from 'next-auth'

// Campos que lib/auth.ts põe na sessão/JWT — tipados aqui pra acabar com os `as unknown as`.
declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & { id: string; isPaid: boolean }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isPaid?: boolean
    chk?: number
  }
}
