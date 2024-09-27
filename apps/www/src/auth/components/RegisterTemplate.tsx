'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Check from '@/common/svgs/Check.svg';

import { useAuth } from '../hooks';
import { useRegisterMutation } from '../mutations';
import type { SocialLoginType } from '../types';
import AuthWrapper from './AuthWrapper';

const registerList = [
  {
    id: 0,
    title: '(필수) 이용약관에 동의합니다.',
    name: 'termsOfUse',
    link: 'https://docs.pagesisters.cc/terms/onboarding',
    agree: false,
  },
  {
    id: 1,
    title: '(필수) 개인정보처리방침에 동의합니다.',
    name: 'privacyPolicy',
    link: 'https://docs.pagesisters.cc/terms/privacy',
    agree: false,
  },
  {
    id: 2,
    title: '(선택) 마케팅 활용 및 광고 수신에 동의합니다.',
    name: 'marketing',
    link: 'https://docs.pagesisters.cc/terms/marketing',
    agree: false,
  },
];

function RegisterTemplate(): React.ReactNode {
  const [agreeList, setAgreeList] = useState([...registerList]);
  const [isAgreed, setIsAgreed] = useState(false);
  const { mutateAsync: register } = useRegisterMutation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { me } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const targetIndex = Number(e.target.dataset.id);
    setAgreeList((prev) => {
      const newAgree = [...prev];
      newAgree[targetIndex].agree = e.target.checked;
      return newAgree;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const isAcceptMarketing = agreeList[2].agree;
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const provider = searchParams.get('provider') as SocialLoginType;
    const providerId = searchParams.get('providerId');
    const profileImage = searchParams.get('profileImage');

    const isEveryQueryParamsExist = name && email && providerId && profileImage;

    if (!isEveryQueryParamsExist) {
      router.push('/');
      return;
    }
    const registerData = {
      name,
      email,
      provider,
      providerId,
      profileImage,
      acceptMarketing: isAcceptMarketing,
    };

    const onSubmit = async (): Promise<void> => {
      const result = await register(registerData);
      console.log(result);
      // 아래 라우터푸시 카카오에서는 필요없는 것 같은데...
      router.push('/');
    };
    void onSubmit();
  };

  useEffect(() => {
    const checked = agreeList[0].agree && agreeList[1].agree;
    if (checked) {
      setIsAgreed(true);
    } else {
      setIsAgreed(false);
    }
  }, [agreeList]);

  useEffect(() => {
    if (me) {
      router.push('/');
    }
  }, [me, router]);

  return (
    <AuthWrapper type="login">
      <form onSubmit={handleSubmit}>
        <div className="mt-8">
          <ul className="divide-y divide-slate-200">
            {registerList.map((item) => (
              <li key={item.id}>
                <label
                  htmlFor={`checkbox-${item.id}`}
                  className="relative flex cursor-pointer items-center gap-2 text-sm text-slate-600 p-4 desktop:px-0"
                  aria-label={item.title}
                >
                  <input
                    id={`checkbox-${item.id}`}
                    data-id={item.id}
                    name={item.name}
                    type="checkbox"
                    className="no-interaction peer absolute flex-none opacity-0"
                    onChange={handleChange}
                  />
                  <div className="center-flex h-5 w-5 flex-none rounded-sm border border-slate-200 bg-white text-transparent peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white peer-focus:ring peer-disabled:bg-slate-100">
                    <Check className="text-base" />
                  </div>
                  <span className="flex-1 text-slate-400 peer-checked:text-current peer-disabled:text-slate-300">
                    <p className="flex items-center justify-between space-x-2">
                      <span>{item.title}</span>
                      <Link
                        target="_blank"
                        className="whitespace-nowrap font-bold underline"
                        href={item.link}
                      >
                        보기
                      </Link>
                    </p>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        {/** 임시 회원가입 버튼 */}
        <button
          disabled={!isAgreed}
          type="submit"
          className="fixed inset-0 top-auto m-auto block desktop:relative desktop:mt-8 desktop:mr-0 desktop:rounded-xl h-12 rounded-md px-4 text-sm bg-indigo-600 text-white hover:bg-indigo-700 focus:ring center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
        >
          회원가입하기
        </button>
      </form>
    </AuthWrapper>
  );
}

export default RegisterTemplate;
