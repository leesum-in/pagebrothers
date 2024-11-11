import { useMemo } from 'react';
import type { VideoWidgetConfig } from '../../../types/pageBrothers.type';

interface VideoProps {
  videoWidgetConfig: VideoWidgetConfig;
}

function Video({ videoWidgetConfig }: VideoProps) {
  const url = useMemo(
    () => videoWidgetConfig.url.replace('watch?v=', 'embed/'),
    [videoWidgetConfig],
  );
  return (
    <div className="relative no-interaction">
      <div
        style={{
          paddingTop: `${(videoWidgetConfig.aspectHeight / videoWidgetConfig.aspectWidth) * 100}%`,
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
  );
}

export default Video;
