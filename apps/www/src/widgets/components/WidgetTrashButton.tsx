import type { WidgetItem } from '@repo/shared';
import { FaRegTrashAlt } from 'react-icons/fa';

import { useWidgetDeleteMutation } from '../mutations';
import useModalStore from '../zustand';

interface WidgetTrashButtonProps {
  widgetItem: WidgetItem;
}

function WidgetTrashButton({ widgetItem }: WidgetTrashButtonProps) {
  const { invitation } = useModalStore();
  const { mutate } = useWidgetDeleteMutation(invitation?.id ?? '');

  const handleClick = () => {
    if (confirm('정말 삭제하시겠어요?\n삭제된 위젯은 다시 복구할 수 없어요.')) {
      mutate(widgetItem.id);
    }
  };

  return (
    <button
      type="button"
      className="center-flex absolute right-0 bottom-0 h-12 w-12 text-red-500"
      onClick={handleClick}
    >
      <FaRegTrashAlt className="w-[14px] h-[14px]" />
    </button>
  );
}

export default WidgetTrashButton;
