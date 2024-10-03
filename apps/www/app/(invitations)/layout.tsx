import type { PropsWithChildren } from 'react';

import { Navigation } from '@/ui/navigation';

function InvitationsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

export default InvitationsLayout;
