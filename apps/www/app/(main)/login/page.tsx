import type { Metadata } from 'next';

import { LoginTemplate } from '@/www/auth';

export const metadata: Metadata = {
  title: '로그인하기',
};

function LoginPage(): React.ReactNode {
  return <LoginTemplate />;
}

export default LoginPage;
