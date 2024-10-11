import dynamic from 'next/dynamic';
import { memo } from 'react';

import type { IInvitation, WidgetItem } from '@/types/pageBrothers.type';

interface WidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem;
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
};

function Widget({ invitation, widgetItem, isMultiModal }: WidgetProps) {
  const Component = components[widgetItem.type];

  return <Component invitation={invitation} widgetItem={widgetItem} isMultiModal={isMultiModal} />;
}

export default memo(Widget);
