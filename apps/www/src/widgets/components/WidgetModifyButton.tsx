'use client';

import { Button } from '@repo/shared';

import type { WidgetItem } from '@/types/pageBrothers.type';

import useModalStore from '../zustand';

interface WidgetModifyButtonProps {
  widgetItem: WidgetItem;
}

function WidgetModifyButton({ widgetItem }: WidgetModifyButtonProps): React.ReactNode {
  const { openModal } = useModalStore();

  const handleButtonClick = () => {
    openModal(widgetItem);
  };

  return (
    <Button
      variants="fill_white"
      size="small"
      className="bg-slate-100 hover:bg-slate-200 transition-colors drop-shadow-none"
      onClick={handleButtonClick}
    >
      위젯 수정
    </Button>
  );
}

export default WidgetModifyButton;
