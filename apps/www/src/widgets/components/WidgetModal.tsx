import type { WidgetItem } from '@repo/shared/src/types/pageBrothers.type';
import { memo } from 'react';

// 여기서는 절대경로(@) 임포트하면 스토리북 실행 안됨
import { IntroWidgetConfigure } from '../intro';
import { VideoWidgetConfigure } from '../video';

interface WidgetModalProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'> | null;
}

function UnmemoizedWidgetModal({ widgetItem }: WidgetModalProps) {
  if (!widgetItem) return <div />;
  if (widgetItem.type === 'INTRO') return <IntroWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'VIDEO') return <VideoWidgetConfigure widgetItem={widgetItem} />;
}

const WidgetModal = memo(UnmemoizedWidgetModal);
export default WidgetModal;
