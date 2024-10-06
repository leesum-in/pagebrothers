import WidgetModifyButton from './WidgetModifyButton';
import WidgetStickerButton from './WidgetStickerButton';
import WidgetTitleButton from './WidgetTitleButton';

interface WidgetButtonsProps {
  title: string;
}

function WidgetButtons({ title }: WidgetButtonsProps) {
  return (
    <div className="flex items-center justify-between p-4 font-bold text-slate-900">
      <WidgetTitleButton title={title} />
      <div className="flex gap-2">
        <WidgetStickerButton />
        <WidgetModifyButton />
      </div>
    </div>
  );
}

export default WidgetButtons;
