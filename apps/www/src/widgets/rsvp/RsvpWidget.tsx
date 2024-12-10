'use client';

import type { IInvitation, RsvpWidgetConfig, WidgetItem } from '@repo/shared';
import { Rsvp } from '@repo/shared';

import { WidgetWrapper } from '../components';

interface RsvpWidgetProps {
  widgetItem: WidgetItem;
  invitation?: IInvitation;
  isMultiModal?: boolean;
}

function RsvpWidget({ widgetItem, invitation, isMultiModal = false }: RsvpWidgetProps) {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      {invitation ? (
        <Rsvp config={widgetItem.config as RsvpWidgetConfig} isMultiModal={isMultiModal} />
      ) : null}
    </WidgetWrapper>
  );
}

export default RsvpWidget;
