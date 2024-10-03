'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { QUERY_KEY_ME } from '@/auth/constants';

function LoginCallbackPage(): React.ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = searchParams.get('token');
    const backUrl = searchParams.get('backUrl');
    if (token) {
      localStorage.setItem('pagebrothers-token', token);
    }

    router.replace(backUrl ?? '/');

    return () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    };
  }, [searchParams, router, queryClient]);

  return null;
}

export default LoginCallbackPage;
