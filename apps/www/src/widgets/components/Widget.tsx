import dynamic from 'next/dynamic';
import { memo } from 'react';

import type { IInvitation, WidgetItem } from '@/types/pageBrothers.type';

interface WidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem | Partial<WidgetItem>;
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
};

function Widget({ invitation, widgetItem, isMultiModal }: WidgetProps) {
  const WidgetComponent = widgetItem.type && components[widgetItem.type as keyof typeof components];

  if (!WidgetComponent) return null;

  return (
    <WidgetComponent
      invitation={invitation}
      widgetItem={widgetItem as WidgetItem}
      isMultiModal={isMultiModal}
    />
  );
}

export default memo(Widget);
