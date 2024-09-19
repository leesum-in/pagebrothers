'use client';

import Link from 'next/link';

import { useAuth } from '@/hooks/auth';

function HeaderMenu(): React.ReactNode {
  const { me } = useAuth();

  return (
    <ul className="flex items-center gap-3 desktop:gap-4">
      <li>
        <Link href="https://docs.pagesisters.cc">자주묻는질문</Link>
      </li>
      <li className="relative">
        {!me ? (
          <Link className="font-bold leading-snug" href="/login">
            로그인
          </Link>
        ) : (
          // headless ui 로 변경 요망
          <button
            className="block h-6 w-6 rounded-full bg-slate-200 bg-cover desktop:h-8 desktop:w-8"
            style={{ backgroundImage: `url(${me.profileImage})` }}
            id="headlessui-menu-button-:ra:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-headlessui-state=""
            type="button"
          />
        )}
      </li>
    </ul>
  );
}

export default HeaderMenu;
