'use client';

import { CloseIcon } from '../../../assets/icons';

interface RsvpRejectedHeaderProps {
  onClose: () => void;
}

function RsvpFormHeader({ onClose }: RsvpRejectedHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white p-3">
      <p className="pl-2 text-base font-bold">참석자 정보를 알려주세요.</p>
      <button type="button" className="center-flex h-12 w-12" onClick={onClose}>
        <CloseIcon className="w-4 h-4" />
      </button>
    </header>
  );
}

export default RsvpFormHeader;
