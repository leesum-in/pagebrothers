import type { IInvitation, VideoWidgetConfig, WidgetItem } from '@/types/pageBrothers.type';
import { WidgetWrapper } from '@/widget/common';

interface VideoWidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem;
}

function VideoWidget({ widgetItem }: VideoWidgetProps): React.ReactNode {
  const url = (widgetItem.config as VideoWidgetConfig).url.replace('watch?v=', 'embed/');

  return (
    <WidgetWrapper title="동영상">
      <div className="relative no-interaction">
        <div style={{ paddingTop: '56.25%' }} />
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

export default VideoWidget;
