import type { Metadata } from 'next';

import LogIn from '@/components/organisms/auth/LogIn';

export const metadata: Metadata = {
  title: '로그인하기',
};

function LoginPage(): React.ReactNode {
  return <LogIn />;
}

export default LoginPage;
