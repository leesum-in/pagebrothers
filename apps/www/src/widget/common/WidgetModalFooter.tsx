'use client';

import { Button } from '@repo/shared';

import type { WidgetItem } from '@/types/pageBrothers.type';

import useModalStore from '../zustand';

interface WidgetModalFooterProps {
  widget: WidgetItem;
}

// 공용 버튼으로 수정 요망
function WidgetModalFooter({ widget }: WidgetModalFooterProps): React.ReactNode {
  const { openMultiModal } = useModalStore();

  const handlePreviewClick = () => {
    openMultiModal(widget);
  };

  return (
    <>
      <Button
        variants="fill_secondary"
        size="medium"
        data-preview
        type="button"
        className="center-flex gap-2 font-bold drop-shadow-none transition-colors "
        onClick={handlePreviewClick}
      >
        미리보기
      </Button>
      <Button
        variants="fill_primary"
        size="medium"
        type="submit"
        className="focus:ring center-flex gap-2 font-bold drop-shadow-none transition-colors "
      >
        적용하기
      </Button>
    </>
  );
}

export default WidgetModalFooter;
