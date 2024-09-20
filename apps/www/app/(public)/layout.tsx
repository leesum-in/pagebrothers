import { type PropsWithChildren } from 'react';

import Header from '@/common/components/Header';

function PublicLayout({ children }: PropsWithChildren): React.ReactNode {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default PublicLayout;
