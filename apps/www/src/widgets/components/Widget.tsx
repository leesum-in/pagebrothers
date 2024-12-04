import type { IInvitation, WidgetItem } from '@repo/shared/src/types/pageBrothers.type';
import dynamic from 'next/dynamic';
import { memo } from 'react';

interface WidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
  isMultiModal?: boolean;
}

const components: Record<
  string,
  React.ComponentType<{ invitation?: IInvitation; widgetItem: WidgetItem; isMultiModal?: boolean }>
> = {
  INTRO: dynamic(() => import('../intro/IntroWidget'), {
    ssr: false,
  }),
  VIDEO: dynamic(() => import('../video/VideoWidget'), {
    ssr: false,
  }),
  MESSAGE: dynamic(() => import('../message/MessageWidget'), {
    ssr: false,
  }),
  CALENDAR: dynamic(() => import('../calendar/CalendarWidget'), {
    ssr: false,
  }),
  LOCATION: dynamic(() => import('../location/LocationWidget'), {
    ssr: false,
  }),
  GALLERY: dynamic(() => import('../gallery/GalleryWidget'), {
    ssr: false,
  }),
  GREETING: dynamic(() => import('../greeting/GreetingWidget'), {
    ssr: false,
  }),
};

function UnmemoizedWidget({ invitation, widgetItem, isMultiModal }: WidgetProps) {
  const WidgetComponent = components[widgetItem.type as keyof typeof components];

  return (
    <WidgetComponent
      invitation={invitation}
      widgetItem={widgetItem as WidgetItem}
      isMultiModal={isMultiModal}
    />
  );
}

const Widget = memo(UnmemoizedWidget);
export default Widget;
