import Move from '@/common/svgs/Move.svg';

interface WidgetTitleButtonProps {
  title: string;
}

function WidgetTitleButton({ title }: WidgetTitleButtonProps): React.ReactNode {
  // 시맨틱태그를 위한 button 등은 shared 컴포넌트를 안쓰는 것인가...?
  // 디렉토리 구조를 widget/video/common 이런식으로 하는게 좋을까??
  return (
    <button type="button" className="center-flex h-8 touch-none gap-3">
      <Move className="text-xl text-slate-500" />
      {title}
    </button>
  );
}

export default WidgetTitleButton;
