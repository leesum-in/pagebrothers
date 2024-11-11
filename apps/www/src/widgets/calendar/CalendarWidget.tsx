import type { WidgetItem } from '@repo/shared';
import { Calendar } from '@repo/shared';

import { WidgetWrapper } from '../components';
import useModalStore from '../zustand';

interface CalendarWidgetProps {
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
}

function CalendarWidget({ widgetItem, isMultiModal = false }: CalendarWidgetProps) {
  const { invitation } = useModalStore();

  if (!invitation) return null;

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <Calendar invitation={invitation} />
    </WidgetWrapper>
  );
}

export default CalendarWidget;
