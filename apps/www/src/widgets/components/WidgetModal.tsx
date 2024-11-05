import { memo } from 'react';

import type { WidgetItem } from '@/types/pageBrothers.type';

import { IntroWidgetConfigure } from '../intro';
import { VideoWidgetConfigure } from '../video';

interface WidgetModalProps {
  widgetItem: WidgetItem | null;
}

function WidgetModal({ widgetItem }: WidgetModalProps): React.ReactNode {
  if (!widgetItem) return null;
  if (widgetItem.type === 'INTRO') return <IntroWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'VIDEO') return <VideoWidgetConfigure widgetItem={widgetItem} />;

  return null;
}

export default memo(WidgetModal);
