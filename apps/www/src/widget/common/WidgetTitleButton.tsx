import Move from '@/ui/svgs/Move.svg';
import { Button } from '@repo/shared';

interface WidgetTitleButtonProps {
  title: string;
}

function WidgetTitleButton({ title }: WidgetTitleButtonProps): React.ReactNode {
  return (
    <Button variants="fill_white" size="medium" className="center-flex h-8 touch-none gap-3">
      <Move className="text-xl text-slate-500" />
      {title}
    </Button>
  );
}

export default WidgetTitleButton;
