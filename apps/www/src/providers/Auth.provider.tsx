'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, type PropsWithChildren } from 'react';

import { useMeQuery } from '@/hooks/queries';

import { Me } from '@/types';
import { deleteCookie } from '@/utils';
import { AuthContext } from '../contexts';

export function AuthProvider({ children }: PropsWithChildren): React.ReactNode {
  const router = useRouter();
  const { data: meFromQuery, isPending, error } = useMeQuery();
  const [me, setMe] = useState<Me | null>(meFromQuery ?? null);

  const logInStartWithProvider = (provider: string, backUrl: string): void => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const authUrl = `${API_URL}/oauth2/authorize/${provider}?redirect_uri=${BASE_URL}/login/callback?backUrl=${backUrl}&register_uri=${BASE_URL}/register?backUrl=${backUrl}`;
    router.push(authUrl);
  };

  const logOut = async (): Promise<void> => {
    await deleteCookie('pagebrothers-token');
    setMe(null);
  };

  useEffect(() => {
    console.log('loading');
  }, [isPending]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  // 나중에 삭제할 임시 코드 me 있는지 추적하기 위해
  useEffect(() => {
    console.log('me =====>', me);
  }, [me]);

  const value = {
    me: me ?? null,
    logOut,
    logInStartWithProvider,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 카카오 로그인 아래처럼 날려야 하는 줄 알았는데...
// const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
// const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
// const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${API_URL}${REDIRECT_URI}?&scope=profile_nickname,account_email,profile_image`;
