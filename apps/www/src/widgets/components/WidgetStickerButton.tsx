import { Button } from '@repo/shared';
import { HiPlus } from 'react-icons/hi';

function WidgetStickerButton(): React.ReactNode {
  return (
    <Button
      variants="fill_white"
      size="small"
      className="relative h-8 px-2 text-xs border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40 drop-shadow-none"
    >
      <input
        className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 file:cursor-pointer"
        type="file"
        accept="image/png, image/jpeg"
      />
      <HiPlus />
      스티커
    </Button>
  );
}

export default WidgetStickerButton;
