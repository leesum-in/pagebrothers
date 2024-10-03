import EditTemplate from '@/invitations/dashboard/components/EditTemplate';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '편집하기',
};

function EditPage(): React.ReactNode {
  return <EditTemplate />;
}

export default EditPage;
