import { Navigation } from '@/ui/navigation';
import { PropsWithChildren } from 'react';

function InvitationsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}

export default InvitationsLayout;
