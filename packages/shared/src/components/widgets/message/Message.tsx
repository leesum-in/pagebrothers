import { TEXT_ALIGN, TEXT_SIZE } from '../../../constants';
import { IInvitation, MessageWidgetConfig, WidgetItem } from '../../../types';

interface MessageProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem;
}

const Message = ({ invitation, widgetItem }: MessageProps) => {
  const { widgetTitle, title, align, size } = widgetItem.config as MessageWidgetConfig;

  return (
    <>
      {title ? (
        <div
          className={`no-interaction space-y-6 p-8 ${TEXT_ALIGN[align]} ${TEXT_SIZE[size]} text-slate-700/70`}
        >
          {widgetTitle ? <p className="text-[1.15em] font-bold"> {widgetTitle}</p> : null}
          <div className="space-y-3">
            <p>{title}</p>
          </div>
        </div>
      ) : (
        <div className="relative no-interaction py-20 px-4 text-center text-sm">
          <p>메세지를 등록해주세요.</p>
        </div>
      )}
    </>
  );
};

export default Message;
