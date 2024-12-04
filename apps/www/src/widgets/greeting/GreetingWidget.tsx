'use client';

import type { GreetingWidgetConfig, IInvitation, WidgetItem } from '@repo/shared';
import { cn, Greeting } from '@repo/shared';

import { WidgetWrapper } from '../components';

interface GreetingWidgetProps {
  widgetItem: WidgetItem;
  invitation?: IInvitation;
  isMultiModal?: boolean;
}

function GreetingWidget({ widgetItem, invitation, isMultiModal = false }: GreetingWidgetProps) {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <div className={cn('', isMultiModal ? '' : 'no-interaction')}>
        {invitation ? <Greeting config={widgetItem.config as GreetingWidgetConfig} /> : null}
      </div>
    </WidgetWrapper>
  );
}

export default GreetingWidget;
