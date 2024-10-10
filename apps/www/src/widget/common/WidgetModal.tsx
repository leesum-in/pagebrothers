import { memo } from 'react';

import type { WidgetItem } from '@/types/pageBrothers.type';

import { VideoWidgetModalContent } from '../video';

interface WidgetModalProps {
  widget: WidgetItem | null;
}

function WidgetModal({ widget }: WidgetModalProps): React.ReactNode {
  if (!widget) return null;

  if (widget.type === 'VIDEO') return <VideoWidgetModalContent widget={widget} />;

  return null;
}

export default memo(WidgetModal);
