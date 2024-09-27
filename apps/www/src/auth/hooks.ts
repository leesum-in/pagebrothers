'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import type { Me } from '@/auth/types';

import { QUERY_KEY_ME } from './constants';
import { useMeQuery } from './queries';

interface UseAuth {
  me: Me | null;
  logInStartWithProvider: (provider: string, backUrl: string) => void;
  logOut: () => void;
}

export function useAuth(): UseAuth {
  const router = useRouter();
  const { data: me, isPending, error } = useMeQuery();

  const queryClient = useQueryClient();

  const logInStartWithProvider = (provider: string, backUrl: string): void => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const authUrl = `${API_URL}/oauth2/authorize/${provider}?redirect_uri=${BASE_URL}/login/callback?backUrl=${backUrl}&register_uri=${BASE_URL}/register?backUrl=${backUrl}`;
    router.push(authUrl);
  };

  const logOut = (): void => {
    localStorage.removeItem('pagebrothers-token');
    queryClient.setQueryData([QUERY_KEY_ME], null);
  };

  useEffect(() => {
    console.log('>>>>>>>>>loading');
  }, [isPending]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  // 나중에 삭제할 임시 코드 me 있는지 추적하기 위해
  useEffect(() => {
    console.log('me =====>', me);
  }, [me]);

  return {
    me: me ?? null,
    logInStartWithProvider,
    logOut,
  };
}
