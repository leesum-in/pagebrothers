import { Message } from '@repo/shared';
import type { WidgetItem } from '@repo/shared/src/types/pageBrothers.type';

import { WidgetWrapper } from '../components';
import useModalStore from '../zustand';

interface MessageWidgetProps {
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
}

function MessageWidget({ widgetItem, isMultiModal = false }: MessageWidgetProps): React.ReactNode {
  const { invitation } = useModalStore();

  if (!invitation) return null;

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <Message invitation={invitation} widgetItem={widgetItem}></Message>
    </WidgetWrapper>
  );
}

export default MessageWidget;
