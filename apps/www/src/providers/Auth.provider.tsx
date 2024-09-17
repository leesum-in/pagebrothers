'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type PropsWithChildren } from 'react';

import { useMeQuery } from '@/hooks/queries';

import { AuthContext } from '../contexts';

export function AuthProvider({ children }: PropsWithChildren): React.ReactNode {
  const router = useRouter();
  const { data: me, isPending, error } = useMeQuery();

  // 처음부터 만들기 << 버튼으로 이동시 backUrl 추가 https://dev.pagesisters.cc/start
  const logInStartWithKakao = (): void => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    // const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    // const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    // const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${API_URL}${REDIRECT_URI}?&scope=profile_nickname,account_email,profile_image`;
    const kakaoAuthUrl = `${API_URL}/oauth2/authorize/kakao?redirect_uri=${BASE_URL}/login/callback?backUrl=/start&register_uri=${BASE_URL}/register?backUrl=/`;
    router.push(kakaoAuthUrl);
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
    logInStartWithKakao,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
