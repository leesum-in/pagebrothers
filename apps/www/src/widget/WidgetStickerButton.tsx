import { HiPlus } from 'react-icons/hi';

function WidgetStickerButton(): React.ReactNode {
  return (
    <button
      type="button"
      className="relative h-8 rounded-sm px-2 text-xs border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
    >
      <input
        className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 file:cursor-pointer"
        type="file"
        accept="image/png, image/jpeg"
      />
      <HiPlus />
      스티커
    </button>
  );
}

export default WidgetStickerButton;
