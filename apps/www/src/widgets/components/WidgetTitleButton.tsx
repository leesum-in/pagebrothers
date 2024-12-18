import { Button } from '@repo/shared';
import type { WidgetType } from '@repo/shared/src/types/pageBrothers.type';

import { Move } from '@/www/ui/svgs';
import { WIDGET_TYPE_KOREAN } from '@/www/widgets/constants';

interface WidgetTitleButtonProps {
  type: WidgetType;
}

function WidgetTitleButton({ type }: WidgetTitleButtonProps): React.ReactNode {
  const koreanType = WIDGET_TYPE_KOREAN[type];
  return (
    <Button
      variants="fill_white"
      size="medium"
      className="center-flex h-8 touch-none gap-3 drop-shadow-none border-none px-0 hover:bg-transparent font-bold text-base"
    >
      <Move className="text-xl text-slate-500" />
      {koreanType}
    </Button>
  );
}

export default WidgetTitleButton;
