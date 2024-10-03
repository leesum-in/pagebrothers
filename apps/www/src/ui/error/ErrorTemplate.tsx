'use client';

import Link from 'next/link';
import { useEffect } from 'react';

function ErrorTemplate() {
  // 아래 useEffect 는 원본 사이트에서 에러 발생시
  // 1. nav 가 숨겨지고 에러 페이지만 떠야 하고
  // 2. next.js 의 붉은색 Error 경고는 뜨지 말야야 하므로
  // 3. 클라이언트 컴포넌트에서 error 를 직접 throw 해서 error.tsx 를 사용할 수 없음
  // 4. 따라서 아래와 같이 처리함
  useEffect(() => {
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.display = 'none';
    }
  }, []);

  return (
    <div className="center-flex fixed inset-0 m-auto p-6 ">
      <section className="w-full max-w-xs space-y-4 whitespace-pre-line text-center">
        <header>
          <div className="text-4xl leading-none empty:hidden">🙅‍♀️</div>
        </header>
        <div>
          <h1 className="text-xl font-bold empty:hidden">데이터를 불러오지 못했어요</h1>
          <p className="mt-1 text-sm leading-relaxed text-slate-400 empty:hidden">
            서버에 문제가 생긴 것 같습니다.
          </p>
        </div>
        <footer className="center-flex mt-4 empty:hidden">
          <Link href="/dashboard">
            <button
              type="button"
              className=" h-12 rounded-md px-4 text-sm border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
            >
              돌아가기
            </button>
          </Link>
        </footer>
      </section>
    </div>
  );
}

export default ErrorTemplate;
