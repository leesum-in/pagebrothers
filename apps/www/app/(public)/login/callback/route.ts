import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

export function GET(request: NextRequest): NextResponse {
  const cookieStore = cookies();
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const backUrl = searchParams.get('backUrl');

  if (token) {
    cookieStore.set('pagebrothers-token', token, {
      maxAge: 7 * 24 * 3600,
      httpOnly: true,
      secure: true,
    });
  }

  const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login/set`);
  response.headers.set('back-url', backUrl ?? '/');

  return response;
}
