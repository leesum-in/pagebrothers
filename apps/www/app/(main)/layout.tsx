import { Suspense, type PropsWithChildren } from 'react';

import { Header } from '@/ui/header';
import { FixedLoader } from '@/ui/loader';

function PublicLayout({ children }: PropsWithChildren): React.ReactNode {
  return (
    <Suspense fallback={<FixedLoader />}>
      <div className="flex min-h-full flex-1 flex-col">
        <Header />
        <main className="p-12 text-black">{children}</main>
      </div>
    </Suspense>
  );
}

export default PublicLayout;
