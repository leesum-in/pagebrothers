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
    mutate(widgetItem.id);
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
