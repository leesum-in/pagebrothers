'use client';

import type { IInvitation, LocationWidgetConfig, WidgetItem } from '@repo/shared';
import { cn, Location } from '@repo/shared';

import { ComponentWithKakaoScript, WidgetWrapper } from '../components';
import { useToastStore } from '../zustand';

interface LocationWidgetProps {
  widgetItem: WidgetItem;
  invitation?: IInvitation;
  isMultiModal?: boolean;
}

function LocationWidget({ widgetItem, invitation, isMultiModal = false }: LocationWidgetProps) {
  const { openToast } = useToastStore();

  const handleCopyAddress = async () => {
    if (!invitation) return;
    await navigator.clipboard.writeText(invitation.location.address);
    openToast(`[${invitation.location.address}]가 복사되었습니다.`);
  };

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <div className={cn('', isMultiModal ? '' : 'no-interaction')}>
        {invitation ? (
          <ComponentWithKakaoScript>
            <Location
              config={widgetItem.config as LocationWidgetConfig}
              invitationLocation={invitation.location}
              isMultiModal={isMultiModal}
              onCopyAddress={handleCopyAddress}
            />
          </ComponentWithKakaoScript>
        ) : null}
      </div>
    </WidgetWrapper>
  );
}

export default LocationWidget;
