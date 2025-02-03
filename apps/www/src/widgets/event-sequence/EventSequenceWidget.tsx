'use client';

import type { EventSequenceWidgetConfig, IInvitation, WidgetItem } from '@repo/shared';
import { EventSequence } from '@repo/shared';

import { WidgetWrapper } from '../components';

interface EventSequenceWidgetProps {
  widgetItem: WidgetItem;
  invitation?: IInvitation;
  isMultiModal?: boolean;
}

function EventSequenceWidget({
  widgetItem,
  invitation,
  isMultiModal = false,
}: EventSequenceWidgetProps) {
  if (!invitation) return null;

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <EventSequence config={widgetItem.config as EventSequenceWidgetConfig} />
    </WidgetWrapper>
  );
}

export default EventSequenceWidget;
