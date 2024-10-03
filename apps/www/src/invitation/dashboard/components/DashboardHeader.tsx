'use client';

import { useAuth } from '@/auth/hooks';
import { Button } from '@repo/shared';
import Link from 'next/link';

function DashboardHeader() {
  const { me } = useAuth();

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="mb-1">
          {me?.name} | {me?.email}
        </p>
        <h1 className="text-3xl font-extrabold leading-snug desktop:text-4xl desktop:leading-snug">
          청첩장 목록
        </h1>
      </div>
      <Link href="/catalog">
        <Button
          variants="fill_white"
          size="large"
          className="desktop:h-12 desktop:rounded-md desktop:px-4 desktop:text-sm h-8 rounded-sm px-2 text-xs border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
        >
          새 청첩장 만들기
        </Button>
      </Link>
    </div>
  );
}

export default DashboardHeader;
