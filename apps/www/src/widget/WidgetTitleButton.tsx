import Move from '@/common/svgs/Move.svg';

interface WidgetTitleButtonProps {
  title: string;
}

function WidgetTitleButton({ title }: WidgetTitleButtonProps): React.ReactNode {
  return (
    <button type="button" className="center-flex h-8 touch-none gap-3">
      <Move className="text-xl text-slate-500" />
      {title}
    </button>
  );
}

export default WidgetTitleButton;
