import { CloseIcon } from '@repo/shared';

import type { WidgetType } from '@/types/pageBrothers.type';

import { WIDGET_TYPE_KOREAN } from '../constants';

interface WidgetModalHeaderProps {
  type: WidgetType | null;
}

function WidgetModalHeader({ type }: WidgetModalHeaderProps): React.ReactNode {
  const koreanType = type ? WIDGET_TYPE_KOREAN[type] : '';

  return (
    <>
      <section className="py-4 desktop:pb-4 desktop:pt-2">
        <div className="font-bold desktop:text-xl">{koreanType}</div>
      </section>
      <section className="center-flex ml-auto translate-x-4 desktop:items-start">
        <button type="button" className="center-flex h-12 w-12">
          <CloseIcon />
        </button>
      </section>
    </>
  );
}

export default WidgetModalHeader;
