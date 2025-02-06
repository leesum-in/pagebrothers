'use client';

import type { UseFormRegisterReturn } from 'react-hook-form';
import { FaRegTrashAlt } from 'react-icons/fa';

interface WidgetLiTitleAndDescProps {
  titleRegister: UseFormRegisterReturn<'invitation'>;
  descRegister: UseFormRegisterReturn<'invitation'>;
  widgetIndex: number;
  index: number;
  handleRemoveClick: (index: number) => void;
}

function WidgetLiTitleAndDesc({
  titleRegister,
  descRegister,
  index,
  handleRemoveClick,
}: WidgetLiTitleAndDescProps) {
  return (
    <li className="relative">
      <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 rounded-b-none focus-within:z-10">
        <div className="flex flex-none items-center" />
        <input
          className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
          spellCheck="false"
          autoComplete="off"
          placeholder="질문"
          {...titleRegister}
        />
        <div className="flex flex-none items-center">
          <button
            tabIndex={-1}
            className="absolute bottom-0 right-0 p-4 text-base text-red-500"
            type="button"
            onClick={() => handleRemoveClick(index)}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </label>
      <label className="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200 -mt-[1px] rounded-t-none">
        <div className="flex items-center" />
        <textarea
          className="block w-full resize-none bg-white px-4 py-3 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300 undefined"
          spellCheck="false"
          autoComplete="off"
          rows={3}
          placeholder="답변을 입력해주세요"
          {...descRegister}
        />
        <div className="flex items-center" />
      </label>
    </li>
  );
}

export default WidgetLiTitleAndDesc;
