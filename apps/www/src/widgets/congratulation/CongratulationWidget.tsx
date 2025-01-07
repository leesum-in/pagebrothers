'use client';

import type {
  CongratulationWidgetConfig,
  IInvitation,
  OwnerAccountItem,
  WidgetItem,
} from '@repo/shared';
import { Congratulation } from '@repo/shared';
import { useCallback } from 'react';

import { WidgetWrapper } from '../components';
import { useToastStore } from '../zustand';

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
  const { openToast } = useToastStore();

  const handleClickCopy = useCallback(
    async (account: OwnerAccountItem) => {
      await navigator.clipboard.writeText(`${account.bank} ${account.number}`);
      openToast(`계좌번호(${account.bank} ${account.number})가 복사됐어요.`);
    },
    [openToast],
  );

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      {invitation ? (
        <Congratulation
          config={widgetItem.config as CongratulationWidgetConfig}
          handleClickCopy={handleClickCopy}
          isMultiModal={isMultiModal}
        />
      ) : null}
    </WidgetWrapper>
  );
}

export default CongratulationWidget;
