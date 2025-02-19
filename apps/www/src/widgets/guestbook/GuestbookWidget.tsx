import Guestbook from '@repo/shared/src/components/widgets/guestbook/Guestbook';
import { WidgetWrapper } from '../components';
import type { IInvitation, WidgetItem } from '@repo/shared';

interface GuestbookWidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
}

function GuestbookWidget({
  widgetItem,
  isMultiModal = false,
  invitation,
}: GuestbookWidgetProps): React.ReactNode {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      {invitation ? <Guestbook widgetItem={widgetItem} isMultiModal={isMultiModal} /> : null}
    </WidgetWrapper>
  );
}

export default GuestbookWidget;
