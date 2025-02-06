'use client';

import { HiPlus } from 'react-icons/hi2';

interface WidgetAddListButtonProps {
  handleAddClick: () => void;
}

function WidgetAddListButton({ handleAddClick }: WidgetAddListButtonProps) {
  return (
    <button
      type="button"
      className="w-full h-12 rounded-md px-4 text-sm border border-dashed border-slate-300 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
      onClick={handleAddClick}
    >
      <span>구성 추가하기</span>
      <HiPlus />
    </button>
  );
}

export default WidgetAddListButton;
