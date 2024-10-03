import { DashboardTemplate } from '@/invitations/dashboard/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대시보드',
};

function DashBoardPage() {
  return <DashboardTemplate />;
}

export default DashBoardPage;
