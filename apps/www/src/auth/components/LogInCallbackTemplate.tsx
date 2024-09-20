'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface LoginCallbackTemplateProps {
  token: string | null;
  backUrl: string;
}

function LoginCallbackTemplate({ token, backUrl }: LoginCallbackTemplateProps): null {
  const router = useRouter();
  useEffect(() => {
    if (token) {
      localStorage.setItem('pagebrothers-token', token);
    }

    router.replace(backUrl);
  }, [token, backUrl, router]);

  return null;
}

export default LoginCallbackTemplate;
