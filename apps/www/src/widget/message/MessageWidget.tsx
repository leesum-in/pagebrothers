import type { IInvitation, WidgetItem } from '@/types/pageBrothers.type';
import { WidgetWrapper } from '../common';

interface MessageWidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem;
}

function MessageWidget({ widgetItem }: MessageWidgetProps): React.ReactNode {
  return (
    <WidgetWrapper widgetItem={widgetItem}>
      <div className="relative no-interaction py-20 px-4 text-center text-sm">
        <p>메세지를 등록해주세요.</p>
      </div>
    </WidgetWrapper>
  );
}

export default MessageWidget;
