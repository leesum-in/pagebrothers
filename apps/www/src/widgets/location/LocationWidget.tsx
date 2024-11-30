'use client';

import type { IInvitation, LocationWidgetConfig, WidgetItem } from '@repo/shared';
import { Location } from '@repo/shared';

import { ComponentWithKakaoScript, WidgetWrapper } from '../components';

interface LocationWidgetProps {
  widgetItem: WidgetItem;
  invitation?: IInvitation;
  isMultiModal?: boolean;
}

function LocationWidget({ widgetItem, invitation, isMultiModal = false }: LocationWidgetProps) {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <div className="no-interaction">
        {invitation ? (
          <ComponentWithKakaoScript>
            <Location
              config={widgetItem.config as LocationWidgetConfig}
              invitationLocation={invitation.location}
            />
          </ComponentWithKakaoScript>
        ) : null}
      </div>
    </WidgetWrapper>
  );
}

export default LocationWidget;
