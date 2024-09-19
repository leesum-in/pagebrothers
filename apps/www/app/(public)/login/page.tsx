import LogInTemplate from '@/auth/components/LogInTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인하기',
};

function LoginPage(): React.ReactNode {
  return <LogInTemplate />;
}

export default LoginPage;
