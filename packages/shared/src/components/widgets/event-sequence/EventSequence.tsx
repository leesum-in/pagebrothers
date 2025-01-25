import { FiClock } from 'react-icons/fi';
import type { EventSequenceWidgetConfig } from '../../../types/pageBrothers.type';
import { cn } from '../../../utils';

interface EventSequenceProps {
  eventSequenceWidgetConfig: EventSequenceWidgetConfig;
  isMultiModal?: boolean;
}

function EventSequence({ eventSequenceWidgetConfig, isMultiModal }: EventSequenceProps) {
  return (
    <div className={cn('space-y-6 p-8', isMultiModal ? '' : 'no-interaction')}>
      <p
        className={cn('whitespace-nowrap text-em-lg font-bold text-theme-inter/70', {
          'text-left':
            eventSequenceWidgetConfig.align === 'LEFT' || !eventSequenceWidgetConfig.align,
          'text-center': eventSequenceWidgetConfig.align === 'CENTER',
          'text-right': eventSequenceWidgetConfig.align === 'RIGHT',
        })}
      >
        {eventSequenceWidgetConfig.title}
      </p>
      <div>
        <ul className="space-y-4">
          {eventSequenceWidgetConfig.items.map((item) => (
            <li className="relative">
              <div className="relative flex items-center gap-2 font-bold">
                <div className="center-flex h-6 w-6 flex-none">
                  <FiClock />
                </div>
                <span>{item.title}</span>
              </div>
              <div className="empty:hidden space-y-2 whitespace-pre-line pl-8 ">
                <p className="[&amp;>a]:text-theme-colored [&amp;>a]:underline">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default EventSequence;
