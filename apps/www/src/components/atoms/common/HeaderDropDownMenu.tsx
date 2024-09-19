'use client';
import { useAuth } from '@/hooks/auth';
import { MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';

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
        <button
          type="button"
          className="flex h-12 w-full items-center px-4 hover:bg-slate-50"
          onClick={logOut}
        >
          로그아웃
        </button>
      </MenuItem>
    </MenuItems>
  );
}

export default HeaderDropDownMenu;
