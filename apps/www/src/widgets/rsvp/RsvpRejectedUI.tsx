'use client';

import { RsvpRejected } from '@repo/shared';

import useModalStore from '../zustand';

function RsvpRejectedUI() {
  const { closeThirdModal } = useModalStore();

  return <RsvpRejected onClose={closeThirdModal} />;
}

export default RsvpRejectedUI;
