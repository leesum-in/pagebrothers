import type { Metadata } from 'next';

import RegisterTemplate from '@/auth/components/RegisterTemplate';

export const metadata: Metadata = {
  title: '회원가입하기',
};

function RegisterPage(): React.ReactNode {
  return <RegisterTemplate />;
}

export default RegisterPage;
