'use client';

import type { GreetingWidgetConfig, IInvitation, WidgetItem } from '@repo/shared';
import { Greeting } from '@repo/shared';

import { WidgetWrapper } from '../components';

interface GreetingWidgetProps {
  widgetItem: WidgetItem;
  invitation?: IInvitation;
  isMultiModal?: boolean;
}

function GreetingWidget({ widgetItem, invitation, isMultiModal = false }: GreetingWidgetProps) {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      {invitation ? (
        <Greeting
          config={widgetItem.config as GreetingWidgetConfig}
          isMultiModal={isMultiModal}
          invitationOwners={invitation.owners}
        />
      ) : null}
    </WidgetWrapper>
  );
}

export default GreetingWidget;
