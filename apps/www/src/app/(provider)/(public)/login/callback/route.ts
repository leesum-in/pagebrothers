import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';

export function GET(request: NextRequest): void {
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

  return redirect(backUrl ?? '/');
}
