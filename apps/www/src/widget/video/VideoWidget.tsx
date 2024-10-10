import { memo, useMemo } from 'react';

import type { VideoWidgetConfig, WidgetItem } from '@/types/pageBrothers.type';
import { WidgetWrapper } from '@/widget/common';

interface VideoWidgetProps {
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
}

function VideoWidget({ widgetItem, isMultiModal = false }: VideoWidgetProps): React.ReactNode {
  const url = useMemo(
    () => (widgetItem.config as VideoWidgetConfig).url.replace('watch?v=', 'embed/'),
    [widgetItem],
  );

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <div className="relative no-interaction">
        <div
          style={{
            paddingTop: `${
              ((widgetItem.config as VideoWidgetConfig).aspectHeight /
                (widgetItem.config as VideoWidgetConfig).aspectWidth) *
              100
            }%`,
          }}
        />
        <iframe
          className="absolute inset-0 w-full h-full"
          src={url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </WidgetWrapper>
  );
}

export default memo(VideoWidget);
