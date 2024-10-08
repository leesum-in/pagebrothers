import dynamic from 'next/dynamic';
import { memo } from 'react';

import type { IInvitation, WidgetType } from '@/types/pageBrothers.type';

interface WidgetProps {
  widgetType: WidgetType;
  invitation: IInvitation;
}

const components: Record<string, React.ComponentType<{ invitation: IInvitation }>> = {
  VIDEO: dynamic(() => import('../video/VideoWidget'), {
    ssr: false,
  }),
};

function Widget({ widgetType, invitation }: WidgetProps) {
  const Component = components[widgetType];

  return <Component invitation={invitation} />;
}

export default memo(Widget);
