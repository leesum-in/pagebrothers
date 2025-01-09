import type { IInvitation, WidgetItem } from '@repo/shared';
import { Calendar } from '@repo/shared';

import { WidgetWrapper } from '../components';

interface CalendarWidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
}

function CalendarWidget({ invitation, widgetItem, isMultiModal = false }: CalendarWidgetProps) {
  if (!invitation) return null;
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <Calendar invitation={invitation} />
    </WidgetWrapper>
  );
}

export default CalendarWidget;
