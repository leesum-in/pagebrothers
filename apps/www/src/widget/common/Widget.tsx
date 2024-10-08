import dynamic from 'next/dynamic';
import { memo } from 'react';

import type { IInvitation, WidgetItem } from '@/types/pageBrothers.type';

interface WidgetProps {
  invitation: IInvitation;
  widgetItem: WidgetItem;
}

const components: Record<
  string,
  React.ComponentType<{ invitation?: IInvitation; widgetItem: WidgetItem }>
> = {
  VIDEO: dynamic(() => import('../video/VideoWidget'), {
    ssr: false,
  }),
};

function Widget({ invitation, widgetItem }: WidgetProps) {
  const Component = components[widgetItem.type];

  return <Component invitation={invitation} widgetItem={widgetItem} />;
}

export default memo(Widget);
