'use client';

import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';

function LayoutWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();

  if (pathname === '/dashboard') {
    return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
  }

  if (pathname.endsWith('/edit')) {
    return <div className="flex flex-1 flex-col bg-slate-50">{children}</div>;
  }

  return <>{children}</>;
}

export default LayoutWrapper;
