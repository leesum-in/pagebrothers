'use client';

import { MenuItem, MenuItems } from '@headlessui/react';
import { Button } from '@repo/shared';
import Link from 'next/link';

import { useAuth } from '@/auth/hooks';

function HeaderDropDownMenu(): React.ReactNode {
  const { logOut } = useAuth();

  return (
    <MenuItems
      as="ul"
      className="absolute right-0 origin-top-right divide-y divide-slate-100 overflow-hidden rounded-lg bg-white text-sm text-slate-600 shadow-md ring-1 ring-slate-200 w-40 translate-y-2 transform opacity-100 scale-100"
    >
      <MenuItem as="li">
        <Link href="/dashboard" className="flex h-12 w-full items-center px-4 hover:bg-slate-50">
          나의 청첩장 목록
        </Link>
      </MenuItem>
      <MenuItem as="li">
        <Button
          variants="fill_white"
          size="medium"
          className="flex h-12 w-full justify-start px-4 hover:bg-slate-50 border-none"
          onClick={logOut}
        >
          로그아웃
        </Button>
      </MenuItem>
    </MenuItems>
  );
}

export default HeaderDropDownMenu;
