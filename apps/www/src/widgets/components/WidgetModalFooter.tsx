'use client';

import { Button } from '@repo/shared';
import type { WidgetItem } from '@repo/shared/src/types/pageBrothers.type';

import useModalStore from '../zustand';

interface WidgetModalFooterProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function WidgetModalFooter({ widgetItem }: WidgetModalFooterProps): React.ReactNode {
  const { openMultiModal } = useModalStore();

  const handlePreviewClick = () => {
    openMultiModal({ widget: widgetItem });
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
