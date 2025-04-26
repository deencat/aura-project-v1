import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Redirect from cell-beauty/stretch-mark to body-care/stretch-mark
  if (pathname === '/cell-beauty/stretch-mark') {
    return NextResponse.redirect(new URL('/body-care/stretch-mark', request.url))
  }
  
  return NextResponse.next()
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    '/cell-beauty/stretch-mark',
  ],
} 