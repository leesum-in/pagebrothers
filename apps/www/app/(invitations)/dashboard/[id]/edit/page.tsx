import type { Metadata } from 'next';

import WidgetEditor from '@/www/widgetEditor/WidgetEditor';
import { EditTemplate } from '@/www/widgets/components';

export const metadata: Metadata = {
  title: '편집하기',
};

function EditPage(): React.ReactNode {
  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      <EditTemplate />
      <WidgetEditor />
    </div>
  );
}

export default EditPage;
