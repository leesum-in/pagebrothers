'use client';

import { Transition, TransitionChild } from '@headlessui/react';
import { type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../../assets/icons';
import { cn } from '../../utils';

interface ModalProps extends PropsWithChildren {
  isModalOpen: boolean;
  isDragging?: boolean;
  onCloseModal: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  modalHeader?: React.ReactNode | null;
  modalFooter?: React.ReactNode | null;
  isMultiModal?: boolean;
  isCalendar?: boolean;
  isModalFooterBg?: boolean;
  modalBgClassName?: string;
  modalContentClassName?: string;
  modalChildrenClassName?: string;
  isHeaderBorderLine?: boolean;
}

function Modal({
  isModalOpen,
  isDragging,
  onCloseModal,
  onSubmit,
  children,
  modalHeader,
  modalFooter,
  isMultiModal = false,
  isModalFooterBg = false,
  isCalendar = false,
  modalBgClassName,
  modalContentClassName,
  modalChildrenClassName,
  isHeaderBorderLine = true,
}: ModalProps) {
  const footerBackground = isModalFooterBg
    ? 'bg-gradient-to-t from-slate-200 to-transparent'
    : 'bg-transparent';

  const headerUnderline = isHeaderBorderLine ? 'border-b border-slate-100' : 'border-none';

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const target = e.target as HTMLElement;
    !target.closest('form') &&
      !target.closest('#multi-modal') &&
      !target.dataset.preview &&
      onCloseModal();
  };

  return createPortal(
    <Transition show={isModalOpen}>
      <div
        className={cn(
          'scroll-lock-layer center-flex z-40 items-end desktop:items-center opacity-100 duration-300 transition-opacity',
          ['data-[closed]:opacity-0', 'data-[enter]:opacity-0', 'data-[leave]:opacity-0'],
        )}
        onClick={handleModalClose}
      >
        <div
          className={cn(
            'scroll-lock-layer-children absolute inset-0 isolate bg-slate-500/50 backdrop-blur-sm',
            {
              'pointer-events-auto': isModalOpen,
            },
            modalBgClassName,
          )}
        />
        <TransitionChild>
          <div
            id="multi-modal"
            className={cn(
              'translate-y-0 desktop:translate-y-4 scroll-lock-layer-children relative isolate max-h-[90%] w-full overflow-x-hidden rounded-t-2xl bg-white desktop:max-h-[calc(100vh-8rem)] desktop:w-[30rem] desktop:rounded-2xl opacity-100 transition-all duration-300',
              [
                'data-[closed]:translate-y-full data-[closed]:desktop:translate-y-4',
                'data-[enter]:translate-y-full data-[enter]:desktop:translate-y-4',
                'data-[leave]:translate-y-full data-[leave]:desktop:translate-y-4 ',
              ],
              isMultiModal ? 'max-w-sm' : 'desktop:w-[480px]',
              modalContentClassName,
            )}
          >
            {isMultiModal ? (
              <>
                {!isCalendar ? (
                  <div className="sticky top-0 z-20 flex h-0 justify-end">
                    <button
                      type="button"
                      className="center-flex m-3 h-12 w-12 rounded-full border border-slate-100 bg-white shadow-1"
                      onClick={onCloseModal}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ) : null}
                {children}
              </>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="bg-slate-50">
                  {modalHeader ? (
                    <header
                      className={`sticky top-0 z-10 flex gap-4 border-b border-slate-100 bg-white px-6 text-slate-900 desktop:gap-6 desktop:px-8 desktop:pt-4 ${headerUnderline}`}
                    >
                      {modalHeader}
                      <section className="center-flex ml-auto translate-x-4 desktop:items-start">
                        <button
                          type="button"
                          className="center-flex h-12 w-12"
                          onClick={onCloseModal}
                        >
                          <CloseIcon />
                        </button>
                      </section>
                    </header>
                  ) : null}
                  <div
                    className={cn('px-6 py-4 desktop:px-8 desktop:py-6', modalChildrenClassName)}
                  >
                    {children}
                  </div>
                  {modalFooter ? (
                    <footer
                      className={`sticky bottom-0 flex justify-end gap-4 bg-gradient-to-t from-slate-50/100 to-slate-50/0 px-6 pb-4 empty:hidden desktop:px-8 desktop:pb-6 ${footerBackground}`}
                    >
                      {modalFooter}
                    </footer>
                  ) : null}
                </div>
              </form>
            )}
          </div>
        </TransitionChild>
      </div>
    </Transition>,
    document.body,
  );
}

export default Modal;
