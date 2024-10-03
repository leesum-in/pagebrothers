import { Suspense, type PropsWithChildren } from 'react';

import { Header } from '@/ui/header';

function PublicLayout({ children }: PropsWithChildren): React.ReactNode {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <main className="p-12 text-black">{children}</main>
    </Suspense>
  );
}

export default PublicLayout;
