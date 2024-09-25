import WidgetStickerButton from './WidgetStickerButton';

function WidgetModifyButtons(): React.ReactNode {
  return (
    <div className="flex gap-2">
      <WidgetStickerButton />
      <button
        type="button"
        className=" h-8 rounded-sm px-2 text-xs border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
      >
        위젯 수정
      </button>
    </div>
  );
}

export default WidgetModifyButtons;
