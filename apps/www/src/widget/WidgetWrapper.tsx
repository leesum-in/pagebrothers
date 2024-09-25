import { type PropsWithChildren } from 'react';

import WidgetModifyButtons from './WidgetModifyButtons';
import WidgetTitleButton from './WidgetTitleButton';

interface WidgetWrapperProps {
  title: string;
}

function WidgetWrapper({
  children,
  title,
}: PropsWithChildren<WidgetWrapperProps>): React.ReactNode {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={false}
      // aria-roledescription="sortable"
      // aria-describedby="DndDescribedBy-0"
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-1 cursor-default"
    >
      <div className="flex items-center justify-between p-4 font-bold text-slate-900">
        <WidgetTitleButton title={title} />
      </div>
      {children}
      <WidgetModifyButtons />
    </div>
  );
}

export default WidgetWrapper;
