'use client';

import type { IInvitation, RsvpWidgetConfig, WidgetItem } from '@repo/shared';
import { Rsvp } from '@repo/shared';

import useModalStore from '@/www/widgets/zustand';

import { WidgetWrapper } from '../components';

interface RsvpWidgetProps {
  widgetItem: WidgetItem;
  invitation?: IInvitation;
  isMultiModal?: boolean;
}

function RsvpWidget({ widgetItem, invitation, isMultiModal = false }: RsvpWidgetProps) {
  const { openThirdModal } = useModalStore();

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      {invitation ? (
        <Rsvp
          config={widgetItem.config as RsvpWidgetConfig}
          isMultiModal={isMultiModal}
          onAcceptClick={() =>
            openThirdModal((widgetItem.config as RsvpWidgetConfig).extraFields, false)
          }
          onRejectClick={() =>
            openThirdModal(
              [
                {
                  id: 'db0cd3a3-50af-46a0-b0fb-7c67e6b78272',
                  type: 'Radio',
                  label: '',
                  options: ['\uD83E\uDD35 신랑 손님', '\uD83D\uDC70 신부 손님'],
                  optional: false,
                  placeholder: '',
                  needResponseRejected: true,
                },
              ],
              true,
            )
          }
        />
      ) : null}
    </WidgetWrapper>
  );
}

export default RsvpWidget;
