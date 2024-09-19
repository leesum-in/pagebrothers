import type { Metadata } from 'next';

import Register from '@/components/organisms/auth/Register';

export const metadata: Metadata = {
  title: '회원가입하기',
};

function RegisterPage(): React.ReactNode {
  return <Register />;
}

export default RegisterPage;
