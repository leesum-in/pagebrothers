'use client';

import type { RsvpExtraField } from '@repo/shared';
import { RsvpAccepted, RsvpRejected } from '@repo/shared';
import { useEffect, useState } from 'react';

import useModalStore, { useToastStore } from '../zustand';

interface RsvpSumbitProps {
  isRejected: boolean | null;
  isThirdModal: boolean;
  extraFields: RsvpExtraField[] | null;
}

function RsvpSumbit({ isRejected, isThirdModal, extraFields }: RsvpSumbitProps) {
  const { openToast } = useToastStore();
  const { closeThirdModal } = useModalStore();

  const [isOpen, setIsOpen] = useState<{
    isRejected: boolean | null;
    isAccepted: boolean | null;
  }>({
    isRejected,
    isAccepted: isRejected === null ? null : !isRejected,
  });

  useEffect(() => {
    if (isRejected === null) {
      setTimeout(() => {
        setIsOpen({
          isRejected: null,
          isAccepted: null,
        });
      }, 300);
    }
  }, [isRejected]);

  if (extraFields === null) return null;

  if (isOpen.isRejected) {
    return (
      <RsvpRejected onClose={closeThirdModal} openToast={openToast} isThirdModal={isThirdModal} />
    );
  }

  if (isOpen.isAccepted) {
    return (
      <RsvpAccepted
        onClose={closeThirdModal}
        openToast={openToast}
        isThirdModal={isThirdModal}
        extraFields={extraFields}
      />
    );
  }

  return null;
}

export default RsvpSumbit;
