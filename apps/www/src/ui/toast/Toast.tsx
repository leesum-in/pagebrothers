'use client';

import { CloseIcon, cn } from '@repo/shared';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import type { ToastStore } from '@/www/widgets';
import { useToastStore } from '@/www/widgets';

function Toast() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const { toastState, closeToast } = useToastStore(
    useShallow((state: ToastStore) => ({
      toastState: state.toastState,
      closeToast: state.closeToast,
    })),
  );

  useEffect(() => {
    if (toastState.isOpen) {
      setTimeout(() => {
        closeToast();
      }, 3000);
    }
  }, [toastState.isOpen, closeToast]);

  useEffect(() => {
    if (toastState.isOpen) {
      setIsOpen(true);
      setIsOpening(true);
      setTimeout(() => {
        setIsOpening(false);
      }, 300);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsOpen(false);
      }, 300);
    }
  }, [toastState.isOpen, closeToast]);

  return (
    <ul className="fixed right-0 top-0 left-0 z-[60] m-auto w-full max-w-sm space-y-2 p-2 pb-0 empty:hidden">
      {isOpen ? (
        <li
          className={cn(
            'relative w-full rounded-lg p-4 text-sm shadow-2 ring-1 ring-inset bg-white text-slate-700 ring-slate-200 transform transition-all duration-300 opacity-100 translate-y-0',
            {
              '-translate-y-20 opacity-0': isClosing || isOpening,
            },
          )}
        >
          <div className="flex items-center">
            <span className="flex-1">{toastState.message}</span>
            <button type="button" className="center-flex w-6 h-6" onClick={closeToast}>
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </li>
      ) : null}
    </ul>
  );
}

export default Toast;
