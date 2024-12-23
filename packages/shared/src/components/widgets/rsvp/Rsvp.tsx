'use client';

import { RsvpWidgetConfig } from '@/shared/types';
import { cn } from '../../../utils';

interface RsvpProps {
  config: RsvpWidgetConfig;
  isMultiModal?: boolean;
  onAcceptClick: () => void;
  onRejectClick: () => void;
}

function Rsvp({ config, isMultiModal, onAcceptClick, onRejectClick }: RsvpProps) {
  const texts = config.text.split('\n\n');

  return (
    <div
      className={cn('space-y-6 overflow-x-hidden px-8 py-12 text-center', {
        'no-interaction': !isMultiModal,
        'text-left': config.align === 'LEFT',
        'text-center': config.align === 'CENTER',
      })}
    >
      {/** 제목 영역 */}
      {config.title && (
        <p className="text-em-lg font-bold text-theme-inter/70 text-center">{config.title}</p>
      )}

      {/** 텍스트 영역 */}
      <div className="space-y-3 whitespace-pre-line empty:hidden inline-block max-w-[20rem] leading-loose ">
        {texts.map((text, index) => (
          <p key={index} className="[&amp;>a]:text-theme-colored [&amp;>a]:underline">
            {text}
          </p>
        ))}
      </div>

      {/** 버튼 영역 */}
      <div>
        <div className="flex gap-4">
          <button
            onClick={onRejectClick}
            type="button"
            className="w-full !border-theme-colored/10 !bg-theme-colored/5 text-theme-inter/70 hover:!bg-theme-colored/10 h-12 rounded-md px-4 text-sm border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
          >
            {config.rejectLabel}
          </button>
          <button
            onClick={onAcceptClick}
            type="button"
            className="w-full !bg-theme-colored/90 hover:!bg-theme-colored h-12 rounded-md px-4 text-sm bg-indigo-600 text-white hover:bg-indigo-700 focus:ring center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
          >
            {config.acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rsvp;
