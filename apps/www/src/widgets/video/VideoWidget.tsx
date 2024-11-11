import Video from '@repo/shared/src/components/widgets/video/Video';
import type { VideoWidgetConfig, WidgetItem } from '@repo/shared/src/types/pageBrothers.type';
import { memo } from 'react';

import { WidgetWrapper } from '@/www/widgets/components';

interface VideoWidgetProps {
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
}

function VideoWidget({ widgetItem, isMultiModal = false }: VideoWidgetProps): React.ReactNode {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <Video videoWidgetConfig={widgetItem.config as VideoWidgetConfig} />
    </WidgetWrapper>
  );
}

export default memo(VideoWidget);
