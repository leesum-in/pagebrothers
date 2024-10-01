import WidgetWrapper from '@/widget/WidgetWrapper';

function VideoWidget(): React.ReactNode {
  return (
    <WidgetWrapper title="Video">
      <div style={{ paddingTop: '56.25%' }} />
      <iframe
        className="absolute inset-0 w-full h-full"
        src="https://www.youtube.com/embed/GJDdBbgJafU"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </WidgetWrapper>
  );
}

export default VideoWidget;
