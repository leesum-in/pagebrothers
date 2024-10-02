import { Suspense, type PropsWithChildren } from 'react';

import Header from '@/ui/components/Header';

function PublicLayout({ children }: PropsWithChildren): React.ReactNode {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      {children}
    </Suspense>
  );
}

export default PublicLayout;
