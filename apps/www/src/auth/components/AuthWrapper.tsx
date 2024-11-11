import type { PropsWithChildren } from 'react';

import { AuthHeader } from '@/www/auth';

interface AuthWrapperProps extends PropsWithChildren {
  type: 'login' | 'register';
}

function AuthWrapper({ children, type }: AuthWrapperProps): React.ReactNode {
  return (
    <main className="h-dvh w-dvw grid place-items-center px-8 py-16">
      <section className="w-full desktop:max-w-sm">
        <AuthHeader type={type} />
        {children}
      </section>
    </main>
  );
}

export default AuthWrapper;
