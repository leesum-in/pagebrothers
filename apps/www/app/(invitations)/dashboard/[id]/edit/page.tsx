import type { Metadata } from 'next';

import { EditTemplate } from '@/widgets/components';

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
