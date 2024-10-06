import dynamic from 'next/dynamic';
import { memo } from 'react';

import type { WidgetItem, WidgetType } from '@/types/pageBrothers.type';

interface WidgetProps {
  widgetType: WidgetType;
  widgetItem: WidgetItem;
}

const components: Record<string, React.ComponentType<WidgetItem>> = {
  VIDEO: dynamic(() => import('../video/VideoWidget'), {
    ssr: false,
  }),
};

function Widget({ widgetType, widgetItem }: WidgetProps) {
  const Component = components[widgetType];

  return <Component {...widgetItem} />;
}

export default memo(Widget);
