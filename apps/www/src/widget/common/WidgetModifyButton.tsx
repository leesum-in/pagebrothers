'use client';

import { Button } from '@repo/shared';

import type { WidgetType } from '@/types/pageBrothers.type';

import useModalStore from '../zustand';

interface WidgetModifyButtonProps {
  type: WidgetType;
}

function WidgetModifyButton({ type }: WidgetModifyButtonProps): React.ReactNode {
  const { openModal } = useModalStore();

  const handleButtonClick = () => {
    openModal(type);
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
