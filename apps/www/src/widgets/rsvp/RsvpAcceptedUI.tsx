'use client';

import type { RsvpExtraField } from '@repo/shared';
import { RsvpAccepted } from '@repo/shared';

import useModalStore from '../zustand';

interface RsvpAcceptedUIProps {
  extraFields: RsvpExtraField[];
}

function RsvpAcceptedUI({ extraFields }: RsvpAcceptedUIProps) {
  const { closeThirdModal } = useModalStore();

  return <RsvpAccepted onClose={closeThirdModal} extraFields={extraFields} />;
}

export default RsvpAcceptedUI;
