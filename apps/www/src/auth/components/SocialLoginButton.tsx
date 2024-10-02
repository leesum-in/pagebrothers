'use client';

import { useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { LuArrowRight } from 'react-icons/lu';
import { RiKakaoTalkFill } from 'react-icons/ri';

import Naver from '@/ui/svgs/Naver.svg';

import { useAuth } from '../hooks';
import type { SocialLoginType } from '../types';

interface SocialLoginButtonProps {
  type: SocialLoginType;
}

const text: Record<SocialLoginType, string> = {
  KAKAO: '카카오톡 아이디로 로그인',
  NAVER: '네이버 아이디로 로그인',
  GOOGLE: '구글 아이디로 로그인',
};

const icon: Record<SocialLoginType, React.ReactNode> = {
  KAKAO: <RiKakaoTalkFill className="relative mr-4 text-2xl text-black" />,
  NAVER: <Naver className="relative mr-4 text-2xl text-[#2dB400]" />,
  GOOGLE: <FcGoogle className="relative mr-4 text-2xl" />,
};

function SocialLoginButton({ type }: SocialLoginButtonProps): React.ReactNode {
  const { logInStartWithProvider } = useAuth();
  const searchParams = useSearchParams();
  const backUrl = searchParams.get('backUrl');

  const handleClick = (): void => {
    logInStartWithProvider(type.toLowerCase(), backUrl ?? '/');
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex justify-center items-center h-14 w-full rounded-lg bg-slate-50 pl-6 pr-4 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-100 disabled:opacity-50"
    >
      {icon[type]}
      <span>{text[type]}</span>
      <LuArrowRight className="ml-auto text-xl text-slate-400" />
    </button>
  );
}

export default SocialLoginButton;
