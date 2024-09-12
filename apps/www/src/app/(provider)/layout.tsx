import { type PropsWithChildren } from 'react';

import { AuthProvider } from '@/providers';

function ProviderLayout({ children }: PropsWithChildren): React.ReactNode {
  return <AuthProvider>{children}</AuthProvider>;
}

export default ProviderLayout;
