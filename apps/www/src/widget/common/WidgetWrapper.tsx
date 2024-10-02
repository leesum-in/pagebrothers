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
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-1 cursor-default w-[416px]"
    >
      <div className="flex items-center justify-between p-4 font-bold text-slate-900">
        <WidgetTitleButton title={title} />
        <WidgetModifyButtons />
      </div>

      <div className="border-t border-slate-200">
        <div className="font-serif text-[14px] leading-loose">
          <div className="relative overflow-hidden">
            <div className="relative no-interaction">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetWrapper;
