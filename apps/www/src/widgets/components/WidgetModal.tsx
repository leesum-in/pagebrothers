import { memo } from 'react';

import type { WidgetItem } from '@/types/pageBrothers.type';

import { IntroWidgetModalContent } from '../intro';
import { VideoWidgetModalContent } from '../video';

interface WidgetModalProps {
  widget: WidgetItem | null;
}

function WidgetModal({ widget }: WidgetModalProps): React.ReactNode {
  if (!widget) return null;
  if (widget.type === 'INTRO') return <IntroWidgetModalContent widgetItem={widget} />;
  if (widget.type === 'VIDEO') return <VideoWidgetModalContent widgetItem={widget} />;

  return null;
}

export default memo(WidgetModal);
