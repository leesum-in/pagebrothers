'use client';

import type { IInvitation, QnaWidgetConfig, WidgetItem } from '@repo/shared';
import { QnA } from '@repo/shared';

import { WidgetWrapper } from '../components';

interface QaWidgetProps {
  widgetItem: WidgetItem;
  invitation?: IInvitation;
  isMultiModal?: boolean;
}

function QnAWidget({ widgetItem, invitation, isMultiModal = false }: QaWidgetProps) {
  if (!invitation) return null;

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <QnA config={widgetItem.config as QnaWidgetConfig} />
    </WidgetWrapper>
  );
}

export default QnAWidget;
