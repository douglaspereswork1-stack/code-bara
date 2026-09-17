import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { PAID_ONLY_PREFIXES } from '@/lib/access'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const { pathname } = request.nextUrl

  // Rotas livres (sem autenticação necessária)
  const publicRoutes = ['/', '/login', '/register', '/api/auth', '/pagamento']
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )

  // Sem token (ou token esvaziado pelo callback jwt — usuário apagado) e rota não pública → login
  const logged = Boolean(token?.sub)
  if (!logged && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Só estas rotas exigem pagamento aqui. /dashboard, /curso, /aula, /quiz e /settings abrem
  // pra qualquer logado — o módulo grátis é liberado e o resto é trancado NA PÁGINA
  // (src/lib/access.ts), porque o middleware não enxerga a que módulo a aula pertence.
  const protectedRoutes = PAID_ONLY_PREFIXES
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )

  if (logged && isProtectedRoute) {
    // Verifica isPaid via JWT (colocado no callback do auth)
    const isPaid = (token as unknown as { isPaid?: boolean }).isPaid

    if (!isPaid) {
      return NextResponse.redirect(new URL('/pagamento', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
