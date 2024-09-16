'use client';

import { useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { AuthContext } from '../contexts';

export function AuthProvider({ children }: PropsWithChildren): React.ReactNode {
  const router = useRouter();

  const logInWithKakao = (): void => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    // const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    // const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
    // const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${API_URL}${REDIRECT_URI}?&scope=profile_nickname,account_email,profile_image`;
    const kakaoAuthUrl = `${API_URL}/oauth2/authorize/kakao?redirect_uri=${BASE_URL}/login/callback?backUrl=${BASE_URL}/start&register_uri=${BASE_URL}/register?backUrl=${BASE_URL}/start`;
    router.push(kakaoAuthUrl);
  };

  const value = {
    me: null,
    logInWithKakao,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
