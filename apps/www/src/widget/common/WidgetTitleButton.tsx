import { Button } from '@repo/shared';

import Move from '@/ui/svgs/Move.svg';

interface WidgetTitleButtonProps {
  title: string;
}

function WidgetTitleButton({ title }: WidgetTitleButtonProps): React.ReactNode {
  return (
    <Button
      variants="fill_white"
      size="medium"
      className="center-flex h-8 touch-none gap-3 drop-shadow-none border-none px-0 hover:bg-transparent font-bold text-base"
    >
      <Move className="text-xl text-slate-500" />
      {title}
    </Button>
  );
}

export default WidgetTitleButton;
