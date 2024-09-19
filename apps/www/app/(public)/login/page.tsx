import type { Metadata } from 'next';

import LogInTemplate from '@/components/organisms/auth/LogInTemplate';

export const metadata: Metadata = {
  title: '로그인하기',
};

function LoginPage(): React.ReactNode {
  return <LogInTemplate />;
}

export default LoginPage;
