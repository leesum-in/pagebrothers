import type {
  IInvitation,
  MessageWidgetConfig,
  WidgetItem,
} from '@repo/shared/src/types/pageBrothers.type';

import { WidgetWrapper } from '../components';
import { TEXT_ALIGN, TEXT_SIZE } from '../constants';

interface MessageWidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem;
}

function MessageWidget({ widgetItem }: MessageWidgetProps): React.ReactNode {
  const { widgetTitle, title, align, size } = widgetItem.config as MessageWidgetConfig;

  return (
    <WidgetWrapper widgetItem={widgetItem}>
      {title ? (
        <div
          className={`no-interaction space-y-6 p-8 ${TEXT_ALIGN[align]} ${TEXT_SIZE[size]} text-slate-700/70`}
        >
          {widgetTitle ? <p className="text-[1.12em] font-black"> {widgetTitle}</p> : null}
          <div className="space-y-3">
            <p>{title}</p>
          </div>
        </div>
      ) : (
        <div className="relative no-interaction py-20 px-4 text-center text-sm">
          <p>메세지를 등록해주세요.</p>
        </div>
      )}
    </WidgetWrapper>
  );
}

export default MessageWidget;
