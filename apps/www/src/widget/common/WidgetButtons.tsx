import type { WidgetItem } from '@/types/pageBrothers.type';

import WidgetModifyButton from './WidgetModifyButton';
import WidgetStickerButton from './WidgetStickerButton';
import WidgetTitleButton from './WidgetTitleButton';

interface WidgetButtonsProps {
  widgetItem: WidgetItem;
}

function WidgetButtons({ widgetItem }: WidgetButtonsProps) {
  return (
    <div className="flex items-center justify-between p-4 font-bold text-slate-900">
      <WidgetTitleButton type={widgetItem.type} />
      <div className="flex gap-2">
        <WidgetStickerButton />
        <WidgetModifyButton widgetItem={widgetItem} />
      </div>
    </div>
  );
}

export default WidgetButtons;
