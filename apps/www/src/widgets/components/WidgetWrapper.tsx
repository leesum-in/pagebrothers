import type { WidgetItem } from '@repo/shared/src/types/pageBrothers.type';
import { type PropsWithChildren } from 'react';

import WidgetHeader from './WidgetHeader';
import WidgetTrashButton from './WidgetTrashButton';

interface WidgetWrapperProps {
  widgetItem?: WidgetItem;
  isMultiModal?: boolean;
}

function WidgetWrapper({
  children,
  widgetItem,
  isMultiModal = false,
}: PropsWithChildren<WidgetWrapperProps>) {
  if (isMultiModal) return <div className="relative overflow-hidden">{children}</div>;

  return (
    <div
      // role="button"
      // tabIndex={0}
      // aria-disabled={false}
      // aria-roledescription="sortable"
      // aria-describedby="DndDescribedBy-0"
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-1 cursor-default w-[416px]"
    >
      {widgetItem ? <WidgetHeader widgetItem={widgetItem} /> : null}

      <div className="border-t border-slate-200">
        {/** 아래 div에 컬러 스키마 클래스네임 추가 */}
        <div className="font-serif text-[14px] leading-loose">
          <div className="relative overflow-hidden">{children}</div>
        </div>
      </div>

      {widgetItem && widgetItem.type !== 'INTRO' ? (
        <WidgetTrashButton widgetItem={widgetItem} />
      ) : null}
    </div>
  );
}

export default WidgetWrapper;
