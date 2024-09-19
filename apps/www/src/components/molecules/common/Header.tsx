import Link from 'next/link';

import HeaderMenu from '@/components/atoms/common/HeaderMenu';
import Logo from '@/components/atoms/svgs/Logo.svg';

function Header(): React.ReactNode {
  return (
    <header className="inset-x-0 z-30 flex h-12 flex-none items-center justify-between gap-6 bg-white px-4 text-sm font-bold text-slate-600 desktop:h-16 desktop:px-8 desktop:text-base absolute !bg-transparent">
      <Link href="/" className="flex items-center gap-2">
        <Logo className="h-5" />
      </Link>
      <HeaderMenu />
    </header>
  );
}

export default Header;
