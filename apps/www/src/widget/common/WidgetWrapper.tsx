import { type PropsWithChildren } from 'react';

import WidgetButtons from './WidgetButtons';

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
      <WidgetButtons title={title} />

      <div className="border-t border-slate-200">
        {/** 아래 div에 컬러 스키마 클래스네임 추가 */}
        <div className="font-serif text-[14px] leading-loose">
          <div className="relative overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default WidgetWrapper;
