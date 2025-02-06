import { Button } from '@repo/shared';
import { HiPlus } from 'react-icons/hi';

interface AddWidgetButtonProps {
  onAddWidget: () => void;
}

function AddWidgetButton({ onAddWidget }: AddWidgetButtonProps) {
  return (
    <Button variants="ghost" size="medium" onClick={onAddWidget} className="w-full">
      위젯 추가
      <HiPlus className="text-slate-600" />
    </Button>
  );
}

export default AddWidgetButton;
