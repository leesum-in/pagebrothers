'use client';

import { FiPlus } from 'react-icons/fi';

interface AddAccountButtonProps {
  onClick: () => void;
}

function CongratulationAddAccountButton({ onClick }: AddAccountButtonProps) {
  return (
    <li>
      <button
        type="button"
        className="w-full h-12 rounded-md px-4 text-sm border border-dashed border-slate-300 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
        onClick={onClick}
      >
        <span>추가하기</span>
        <FiPlus className="text-lg" />
      </button>
    </li>
  );
}

export default CongratulationAddAccountButton;
