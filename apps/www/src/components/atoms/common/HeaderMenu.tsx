'use client';

import { Menu, MenuButton } from '@headlessui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/hooks/auth';

import HeaderDropDownMenu from './HeaderDropDownMenu';

function HeaderMenu(): React.ReactNode {
  const { me } = useAuth();
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-3 desktop:gap-4">
      <li>
        <Link href="https://docs.pagesisters.cc">자주묻는질문</Link>
      </li>
      <li className="relative">
        {!me ? (
          <Link className="font-bold leading-snug" href={`/login?backUrl=${pathname}`}>
            로그인
          </Link>
        ) : (
          <Menu>
            <MenuButton
              className="block h-6 w-6 rounded-full bg-slate-200 bg-cover desktop:h-8 desktop:w-8"
              style={{ backgroundImage: `url(${me.profileImage})` }}
              type="button"
            />
            <HeaderDropDownMenu />
          </Menu>
        )}
      </li>
    </ul>
  );
}

export default HeaderMenu;
