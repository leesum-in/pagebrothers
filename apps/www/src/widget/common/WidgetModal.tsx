import { memo } from 'react';

import type { WidgetType } from '@/types/pageBrothers.type';

import { VideoWidgetModalContent } from '../video';

interface WidgetModalProps {
  type: WidgetType | null;
}

function WidgetModal({ type }: WidgetModalProps): React.ReactNode {
  if (!type) return null;

  if (type === 'VIDEO') {
    return <VideoWidgetModalContent />;
  }

  return null;
}

export default memo(WidgetModal);
