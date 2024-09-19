import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface LoginCallbackPageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

interface LoginCallbackTemplateClientProps {
  token: string;
  backUrl: string;
}

export function LoginCallbackPage({ searchParams }: LoginCallbackPageProps): React.ReactNode {
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

  return <LoginCallbackTemplateClient token={token} backUrl={backUrl} />;
}

('use client');

export function LoginCallbackTemplateClient({
  token,
  backUrl,
}: LoginCallbackTemplateClientProps): null {
  const router = useRouter();
  useEffect(() => {
    if (token) {
      localStorage.setItem('pagebrothers-token', token);
    }

    router.replace(backUrl);
  }, [token, backUrl, router]);

  return null;
}
