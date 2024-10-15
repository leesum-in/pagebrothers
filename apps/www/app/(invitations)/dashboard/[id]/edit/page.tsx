import type { Metadata } from 'next';

import { EditTemplate } from '@/invitations/dashboard/components';

export const metadata: Metadata = {
  title: '편집하기',
};

function EditPage(): React.ReactNode {
  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <EditTemplate />
    </div>
  );
}

export default EditPage;
