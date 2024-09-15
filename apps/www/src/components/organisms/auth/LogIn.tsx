'use client';

import LogInHeader from '@/components/atoms/auth/LogInHeader';
import SocialLoginButton from '@/components/molecules/auth/SocialLoginButton';
import { SocialLoginType } from '@/types';

function LogIn(): React.ReactNode {
  return (
    <main className="h-dvh grid place-items-center px-8 py-16">
      <section className="w-full desktop:max-w-sm">
        <LogInHeader />
        <div className="mt-8">
          <ul className="space-y-2 font-bold">
            {Object.values(SocialLoginType).map((type) => (
              <li key={type}>
                <SocialLoginButton type={type} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default LogIn;
