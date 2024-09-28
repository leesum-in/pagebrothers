import { Button } from '@repo/shared';

import WidgetStickerButton from './WidgetStickerButton';

function WidgetModifyButtons(): React.ReactNode {
  // 이렇게 쓰면 되나요..?
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
