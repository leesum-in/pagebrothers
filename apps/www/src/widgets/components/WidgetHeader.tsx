import type { WidgetItem } from '@repo/shared/src/types/pageBrothers.type';

import {
  WidgetModifyButton,
  WidgetStickerButton,
  WidgetTitleButton,
} from '@/www/widgets/components';

interface WidgetButtonsProps {
  widgetItem: WidgetItem;
}

function WidgetHeader({ widgetItem }: WidgetButtonsProps) {
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

export default WidgetHeader;
