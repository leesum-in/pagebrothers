import Guestbook from '@repo/shared/src/components/widgets/guestbook/Guestbook';
import { WidgetWrapper } from '../components';
import type { WidgetItem } from '@repo/shared';

interface GuestbookWidgetProps {
  widgetItem?: WidgetItem;
  isMultiModal?: boolean;
}

function GuestbookWidget({
  widgetItem,
  isMultiModal = false,
}: GuestbookWidgetProps): React.ReactNode {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <Guestbook widgetItem={widgetItem} isMultiModal={isMultiModal} />
    </WidgetWrapper>
  );
}

export default GuestbookWidget;
