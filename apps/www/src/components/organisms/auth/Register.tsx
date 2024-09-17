'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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

function Register(): React.ReactNode {
  const [agreeList, setAgreeList] = useState([...registerList]);
  const [isAgreed, setIsAgreed] = useState(false);
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
  };

  useEffect(() => {
    const checked = agreeList[0].agree && agreeList[1].agree;
    if (checked) {
      setIsAgreed(true);
    } else {
      setIsAgreed(false);
    }
  }, [agreeList]);

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
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-base"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
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

export default Register;