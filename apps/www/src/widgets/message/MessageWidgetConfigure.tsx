import { WidgetItem } from '@repo/shared';

interface MessageWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function MessageWidgetConfigure({ widgetItem }: MessageWidgetConfigureProps) {
  return <div>MessageWidgetConfigure</div>;
}

export default MessageWidgetConfigure;
