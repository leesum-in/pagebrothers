import type { WidgetType } from '@/types/pageBrothers.type';

import { WIDGET_TYPE_KOREAN } from '../constants';

interface WidgetModalHeaderProps {
  type: WidgetType | null;
}

// 그냥 ModalHeader 와 WidgetModalHeader 로 나뉘어있음
// 추후 통합 필요
function WidgetModalHeader({ type }: WidgetModalHeaderProps): React.ReactNode {
  const koreanType = type ? WIDGET_TYPE_KOREAN[type] : '';

  return (
    <section className="py-4 desktop:pb-4 desktop:pt-2">
      <div className="font-bold desktop:text-xl">{koreanType}</div>
    </section>
  );
}

export default WidgetModalHeader;
