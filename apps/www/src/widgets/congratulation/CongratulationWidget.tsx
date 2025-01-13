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
import useModalStore, { useToastStore } from '../zustand';

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
  const { openThirdModal } = useModalStore();

  const handleClickCopy = useCallback(
    async (account: OwnerAccountItem) => {
      await navigator.clipboard.writeText(`${account.bank} ${account.number}`);
      openToast(`계좌번호(${account.bank} ${account.number})가 복사됐어요.`);
    },
    [openToast],
  );

  const handleClickOpenThirdModal = useCallback(
    (type: 'groom' | 'bride') => {
      const groomAccounts = Object.values(
        (widgetItem.config as CongratulationWidgetConfig).accounts,
      )[0];
      const brideAccounts = Object.values(
        (widgetItem.config as CongratulationWidgetConfig).accounts,
      )[1];

      openThirdModal({
        items: type === 'groom' ? groomAccounts.items : brideAccounts.items,
        isRejected: false,
      });
    },
    [openThirdModal, widgetItem.config],
  );

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      {invitation ? (
        <Congratulation
          config={widgetItem.config as CongratulationWidgetConfig}
          handleClickCopy={handleClickCopy}
          handleClickOpenThirdModal={handleClickOpenThirdModal}
          isMultiModal={isMultiModal}
        />
      ) : null}
    </WidgetWrapper>
  );
}

export default CongratulationWidget;
