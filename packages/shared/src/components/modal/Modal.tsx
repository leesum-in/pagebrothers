'use client';

import { memo, useCallback, useEffect, useRef, useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '../../assets/icons';
import type { WidgetType } from '../../types';
import { cn } from '../../utils';

interface ModalProps extends PropsWithChildren {
  isModalOpen: boolean;
  isDragging?: boolean;
  onCloseModal: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  modalHeader?: React.ReactNode | null;
  modalFooter?: React.ReactNode | null;
  isMultiModal?: boolean;
  isThirdModal?: boolean;
  isCalendar?: boolean;
  isModalFooterBg?: boolean;
  modalBgClassName?: string;
  modalContentClassName?: string;
  modalChildrenClassName?: string;
  isHeaderBorderLine?: boolean;
  widgetType?: WidgetType;
  reset?: () => void;
}

function UnmemoizedModal({
  isModalOpen,
  isDragging,
  onCloseModal,
  onSubmit,
  children,
  modalHeader,
  modalFooter,
  isMultiModal = false,
  isThirdModal = false,
  isModalFooterBg = false,
  isCalendar = false,
  modalBgClassName,
  modalContentClassName,
  modalChildrenClassName,
  isHeaderBorderLine = true,
  widgetType,
  reset,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isDraggingInMultiModal, setIsDraggingInMultiModal] = useState(false);

  // 멀티모달시에 드래그 상태 추적이 모노레포 상태에서 힘들기 때문에
  // 여기에도 어쩔 수 없이 일단 드래그 상태 추적 로직 추가
  const isMouseDownRef = useRef(false);
  const diffRef = useRef(0);
  const startPosRef = useRef(0);

  const calculateDiff = useCallback(
    (
      e:
        | MouseEvent
        | TouchEvent
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>,
    ) => {
      const currentPosition = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      diffRef.current = currentPosition - startPosRef.current;
    },
    [],
  );

  const handleMouseDownTouchStartInModal = (
    e:
      | MouseEvent
      | React.MouseEvent<HTMLDivElement>
      | TouchEvent
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    isMouseDownRef.current = true;
    if ('clientX' in e) {
      startPosRef.current = e.clientX;
    } else {
      startPosRef.current = e.touches[0].clientX;
    }
  };

  const handleMouseUpTouchEndInModal = (
    e:
      | MouseEvent
      | React.MouseEvent<HTMLDivElement>
      | React.TouchEvent<HTMLDivElement>
      | TouchEvent,
  ) => {
    isMouseDownRef.current = false;
    diffRef.current = 0;
    setTimeout(() => {
      setIsDraggingInMultiModal(false);
    }, 100);
  };

  const handleMouseMoveTouchMoveInModal = (
    e:
      | MouseEvent
      | React.MouseEvent<HTMLDivElement>
      | TouchEvent
      | React.TouchEvent<HTMLDivElement>,
  ) => {
    calculateDiff(e);
    if (isMouseDownRef.current && diffRef.current !== 0) {
      setIsDraggingInMultiModal(true);
    }
  };

  const handleModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (isDragging || isDraggingInMultiModal) return;
    !target.closest('form') &&
      !target.closest('#multi-modal') &&
      !target.closest('#third-modal') &&
      !target.dataset.preview &&
      (onCloseModal(), reset?.());
  };

  const handleModalCloseWithCloseButton = () => {
    onCloseModal();
    reset?.();
  };

  const footerBackground = isModalFooterBg
    ? 'bg-gradient-to-t from-slate-200 to-transparent'
    : 'bg-transparent';

  const headerUnderline = isHeaderBorderLine ? 'border-b border-slate-100' : 'border-none';

  useEffect(() => {
    if (isModalOpen) {
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
  }, [isModalOpen]);

  useEffect(() => {
    // 전역 이벤트 추가
    window.addEventListener('mousedown', handleMouseDownTouchStartInModal);
    window.addEventListener('mousemove', handleMouseMoveTouchMoveInModal);
    window.addEventListener('mouseup', handleMouseUpTouchEndInModal);
    window.addEventListener('touchstart', handleMouseDownTouchStartInModal);
    window.addEventListener('touchmove', handleMouseMoveTouchMoveInModal);
    window.addEventListener('touchend', handleMouseUpTouchEndInModal);

    return () => {
      // 이벤트 정리
      window.removeEventListener('mousedown', handleMouseDownTouchStartInModal);
      window.removeEventListener('mousemove', handleMouseMoveTouchMoveInModal);
      window.removeEventListener('mouseup', handleMouseUpTouchEndInModal);
      window.removeEventListener('touchstart', handleMouseDownTouchStartInModal);
      window.removeEventListener('touchmove', handleMouseMoveTouchMoveInModal);
      window.removeEventListener('touchend', handleMouseUpTouchEndInModal);
    };
  }, []);

  if (!isOpen) return;

  return createPortal(
    <div
      id={isMultiModal ? 'multi-modal-bg' : ''}
      className={cn('scroll-lock-layer center-flex z-40 items-end desktop:items-center')}
      onClick={handleModalClose}
    >
      <div
        id={isMultiModal ? 'multi-modal-inner-bg' : ''}
        className={cn(
          'scroll-lock-layer-children absolute inset-0 isolate bg-slate-500/50 backdrop-blur-sm opacity-100 duration-300 transition-opacity',
          {
            'pointer-events-auto': isModalOpen,
            'opacity-0': isClosing || isOpening,
          },
          modalBgClassName,
        )}
      />
      <div
        id={isMultiModal ? 'multi-modal' : isThirdModal ? 'third-modal' : ''}
        className={cn(
          'translate-y-0 desktop:translate-y-0 scroll-lock-layer-children relative isolate max-h-[90%] w-full overflow-x-hidden rounded-t-2xl bg-white desktop:max-h-[calc(100vh-8rem)] desktop:w-[30rem] desktop:rounded-2xl opacity-100 transition-all duration-300',
          {
            'translate-y-0 desktop:translate-y-4 opacity-0': isClosing || isOpening,
            'font-serif': isMultiModal,
          },
          isMultiModal ? 'max-w-sm' : 'desktop:w-[480px]',
          modalContentClassName,
        )}
      >
        {isThirdModal ? <>{children}</> : null}
        {isMultiModal ? (
          <>
            {!isCalendar ? (
              <div className="sticky top-0 z-20 flex h-0 justify-end">
                <button
                  type="button"
                  className="center-flex m-3 h-12 w-12 rounded-full border border-slate-100 bg-white shadow-1"
                  onClick={handleModalCloseWithCloseButton}
                >
                  <CloseIcon />
                </button>
              </div>
            ) : null}
            {children}
          </>
        ) : null}

        {!isMultiModal && !isThirdModal ? (
          <form id="modal-form" onSubmit={onSubmit}>
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
                      onClick={handleModalCloseWithCloseButton}
                    >
                      <CloseIcon />
                    </button>
                  </section>
                </header>
              ) : null}
              <div className={cn('px-6 py-4 desktop:px-8 desktop:py-6', modalChildrenClassName)}>
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
        ) : null}
      </div>
    </div>,
    document.body,
  );
}

const Modal = memo(UnmemoizedModal);
export default Modal;
