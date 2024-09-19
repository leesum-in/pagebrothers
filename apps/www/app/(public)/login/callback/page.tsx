import { cookies } from 'next/headers';

import LoginCallbackTemplate from '@/auth/components/LogInCallbackTemplate';

interface LoginCallbackPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

function LoginCallbackPage({ searchParams }: LoginCallbackPageProps): React.ReactNode {
  const cookieStore = cookies();
  const token = searchParams.token as string;
  const backUrl = searchParams.backUrl as string;

  if (token) {
    cookieStore.set('pagebrothers-token', token, {
      maxAge: 7 * 24 * 3600,
      httpOnly: true,
      secure: true,
    });
  }

  return <LoginCallbackTemplate token={token} backUrl={backUrl} />;
}

export default LoginCallbackPage;
