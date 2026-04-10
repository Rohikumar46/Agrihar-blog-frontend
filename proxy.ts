import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_TOKEN_KEY } from '@/lib/auth-constants'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(AUTH_TOKEN_KEY)?.value

  if (pathname === '/admin/login') {
    if (token) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
  }

  if (pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
