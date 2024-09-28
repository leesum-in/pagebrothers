import { Button } from '@repo/shared';

import WidgetStickerButton from './WidgetStickerButton';

function WidgetModifyButtons(): React.ReactNode {
  // 이렇게 쓰면 되나요..?
  // rounded 가 안먹어요
  // arbitrary 클래스들이 안먹어요
  // text-[12px] 는 또 먹었어요....;;;
  return (
    <div className="flex gap-2">
      <WidgetStickerButton />
      <Button
        variants="fill_white"
        size="small"
        className="bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        위젯 수정
      </Button>
    </div>
  );
}

export default WidgetModifyButtons;
