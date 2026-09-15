import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

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

  // Se não tem token e não é rota pública → redireciona pro login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Se tem token mas não pagou e tenta acessar rota protegida
  const protectedRoutes = ['/dashboard', '/curso', '/aula', '/quiz', '/desafios', '/rankings', '/projetos', '/comunidade', '/settings']
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )

  if (token && isProtectedRoute) {
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
