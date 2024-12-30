'use client';

import type { CongratulationWidgetConfig } from '../../../types';
import { cn } from '../../../utils';

interface CongratulationProps {
  config: CongratulationWidgetConfig;
  isMultiModal?: boolean;
}

function Congratulation({ config, isMultiModal = false }: CongratulationProps) {
  return (
    <div
      className={cn('space-y-6 overflow-x-hidden px-8 py-12 text-center', {
        'no-interaction': !isMultiModal,
        'text-left': config.align === 'LEFT',
        'text-center': config.align === 'CENTER',
      })}
    >
      <p className="text-em-lg font-bold text-theme-inter/70 text-center">마음 전하기</p>
      <ul className="center-flex gap-6 empty:hidden">
        <li className="overflow-hidden " data-headlessui-state="">
          <div
            className="group w-full space-y-2"
            id="headlessui-disclosure-button-:rf:"
            aria-expanded="false"
            data-headlessui-state=""
            aria-controls="headlessui-disclosure-panel-:rg:"
          >
            <div className="space-x-1 text-center">
              신랑 <strong className="font-bold">테슷 측</strong>
            </div>
            <button
              type="button"
              className="inline-flex max-w-full flex-none  whitespace-nowrap !border-theme-colored/20 !bg-theme-colored/5 !text-theme-inter/70 group-hover:!bg-theme-colored/10 false h-12 rounded-md px-4 text-sm border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
            >
              <span className="truncate">마음 전하실 곳</span>
            </button>
          </div>
          <div
            id="headlessui-disclosure-panel-:rg:"
            hidden
            data-headlessui-state=""
            style={{ display: 'none' }}
          ></div>
        </li>
        <li className="overflow-hidden " data-headlessui-state="">
          <div
            className="group w-full space-y-2"
            id="headlessui-disclosure-button-:rh:"
            aria-expanded="false"
            data-headlessui-state=""
            aria-controls="headlessui-disclosure-panel-:ri:"
          >
            <div className="space-x-1 text-center">
              신부 <strong className="font-bold">트맨 측</strong>
            </div>
            <button
              type="button"
              className="inline-flex max-w-full flex-none whitespace-nowrap !border-theme-colored/20 !bg-theme-colored/5 !text-theme-inter/70 group-hover:!bg-theme-colored/10 false h-12 rounded-md px-4 text-sm border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
            >
              <span className="truncate">마음 전하실 곳</span>
            </button>
          </div>
          <div
            id="headlessui-disclosure-panel-:ri:"
            hidden
            data-headlessui-state=""
            style={{ display: 'none' }}
          ></div>
        </li>
      </ul>
    </div>
  );
}

export default Congratulation;
