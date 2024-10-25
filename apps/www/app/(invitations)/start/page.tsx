import type { Metadata } from 'next';

import { StartTemplate } from '@/widgets/components';

export const metadata: Metadata = {
  title: '시작하기',
};

function StartPage(): React.ReactNode {
  return <StartTemplate />;
}

export default StartPage;
