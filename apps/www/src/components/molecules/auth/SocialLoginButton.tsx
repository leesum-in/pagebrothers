import { FcGoogle } from 'react-icons/fc';
import { LuArrowRight } from 'react-icons/lu';
import { RiKakaoTalkFill } from 'react-icons/ri';

import NaverSvg from '@/components/atoms/auth/svgs/NaverSvg.svg';

export enum SocialLoginType {
  KAKAO = 'kakao',
  NAVER = 'naver',
  GOOGLE = 'google',
}

interface SocialLoginButtonProps {
  type: SocialLoginType;
}

const text: Record<SocialLoginType, string> = {
  kakao: '카카오톡 아이디로 로그인',
  naver: '네이버 아이디로 로그인',
  google: '구글 아이디로 로그인',
};

const icon: Record<SocialLoginType, React.ReactNode> = {
  kakao: <RiKakaoTalkFill className="relative mr-4 text-2xl text-black" />,
  naver: <NaverSvg className="relative mr-4 text-2xl text-[#2dB400]" />,
  google: <FcGoogle className="relative mr-4 text-2xl" />,
};

function SocialLoginButton({ type }: SocialLoginButtonProps): React.ReactNode {
  return (
    <button
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