import type { PropsWithChildren } from 'react';

import { Toast } from '@/www/ui';
import { Navigation } from '@/www/ui/navigation';

function InvitationsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation />
      {children}
      <Toast />
    </>
  );
}

export default InvitationsLayout;
