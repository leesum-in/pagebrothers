import type { WidgetType } from '@/types/pageBrothers.type';

import WidgetModifyButton from './WidgetModifyButton';
import WidgetStickerButton from './WidgetStickerButton';
import WidgetTitleButton from './WidgetTitleButton';

interface WidgetButtonsProps {
  type: WidgetType;
}

function WidgetButtons({ type }: WidgetButtonsProps) {
  return (
    <div className="flex items-center justify-between p-4 font-bold text-slate-900">
      <WidgetTitleButton type={type} />
      <div className="flex gap-2">
        <WidgetStickerButton />
        <WidgetModifyButton type={type} />
      </div>
    </div>
  );
}

export default WidgetButtons;
