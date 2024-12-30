'use client';

import type { CongratulationWidgetConfig, IInvitation, WidgetItem } from '@repo/shared';
import { Congratulation } from '@repo/shared';

import { WidgetWrapper } from '../components';

interface CongratulationWidgetProps {
  widgetItem: WidgetItem;
  invitation?: IInvitation;
  isMultiModal?: boolean;
}

function CongratulationWidget({
  widgetItem,
  invitation,
  isMultiModal = false,
}: CongratulationWidgetProps) {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      {invitation ? (
        <Congratulation config={widgetItem.config as CongratulationWidgetConfig} />
      ) : null}
    </WidgetWrapper>
  );
}

export default CongratulationWidget;
