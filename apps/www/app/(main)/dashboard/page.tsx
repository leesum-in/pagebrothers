import type { Metadata } from 'next';

import { DashboardTemplate } from '@/www/widgets/components';

export const metadata: Metadata = {
  title: '대시보드',
};

function DashBoardPage() {
  return <DashboardTemplate />;
}

export default DashBoardPage;
