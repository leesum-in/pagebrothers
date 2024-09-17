// import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// export function middleware(request: NextRequest): NextResponse {
export function middleware(): NextResponse {
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login/callback).*)',
  ],
};
