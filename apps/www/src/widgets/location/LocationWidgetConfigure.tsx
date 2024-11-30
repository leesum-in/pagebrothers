'use client';

import type { WidgetItem } from '@repo/shared';

interface LocationWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function LocationWidgetConfigure({ widgetItem }: LocationWidgetConfigureProps) {
  return <div>LocationWidgetConfigure</div>;
}

export default LocationWidgetConfigure;
