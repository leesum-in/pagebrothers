import { StartTemplate } from '@/invitation/start/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시작하기',
};

function StartPage(): React.ReactNode {
  return <StartTemplate />;
}

export default StartPage;
