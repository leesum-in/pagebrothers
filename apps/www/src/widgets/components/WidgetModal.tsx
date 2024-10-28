import { memo } from 'react';

import type { WidgetItem } from '@/types/pageBrothers.type';

import { IntroWidgetConfigure } from '../intro';
import { VideoWidgetConfigure } from '../video';

interface WidgetModalProps {
  widget: WidgetItem | null;
}

function WidgetModal({ widget }: WidgetModalProps): React.ReactNode {
  if (!widget) return null;
  if (widget.type === 'INTRO') return <IntroWidgetConfigure widgetItem={widget} />;
  if (widget.type === 'VIDEO') return <VideoWidgetConfigure widgetItem={widget} />;

  return null;
}

export default memo(WidgetModal);
