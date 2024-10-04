import ReactDOM from 'react-dom';
import { cn } from '../../../src/utils';

interface ModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  children: React.ReactNode;
  modalHeader?: React.ReactNode;
  modalFooter?: React.ReactNode;
  isModalHeader?: boolean;
  isModalFooter?: boolean;
  zIndex?: number;
  isMultiModal?: boolean;
  isModalFooterBg?: boolean;
  modalBgClassName?: string;
  modalContentClassName?: string;
  modalChildrenClassName?: string;
  isHeaderBorderLine?: boolean;
}

const Modal = ({
  isModalOpen,
  onCloseModal,
  children,
  isModalHeader,
  isModalFooter,
  modalHeader,
  modalFooter,
  zIndex = 50,
  isMultiModal = false,
  isModalFooterBg = false,
  modalBgClassName,
  modalContentClassName,
  modalChildrenClassName,
  isHeaderBorderLine = true,
}: ModalProps) => {
  const modalBackground = cn(
    `fixed inset-0 bg-slate-500/50 flex justify-center items-end desktop:items-center z-[${zIndex}] transform transition-opacity duration-300`,
    {
      'pointer-events-auto backdrop-blur-sm opacity-100': isModalOpen,
      'pointer-events-none opacity-0': !isModalOpen,
    },
    modalBgClassName,
  );

  const multiModalWidth = isMultiModal ? 'max-w-sm' : 'desktop:w-[480px]';

  const modalContent = cn(
    `relative bg-white w-full ${multiModalWidth} max-h-[90vh] rounded-t-2xl desktop:rounded-2xl shadow-lg flex flex-col overflow-y-auto transform transition-all duration-300`,
    {
      'opacity-100 translate-y-0': isModalOpen,
      'opacity-0 translate-y-full desktop:translate-y-4': !isModalOpen,
    },
    modalContentClassName,
  );

  const footerBackground = isModalFooterBg
    ? 'bg-gradient-to-t from-slate-200 to-transparent'
    : 'bg-transparent';

  const headerUnderline = isHeaderBorderLine ? 'border-b border-slate-100' : 'border-none';

  return ReactDOM.createPortal(
    <>
      <div className={modalBackground} onClick={onCloseModal}>
        <div className={modalContent} onClick={(e) => e.stopPropagation()}>
          {isModalHeader && (
            <div className={`sticky top-0 bg-white ${headerUnderline} z-10`}>{modalHeader}</div>
          )}
          <div
            className={cn('flex-grow px-6 py-4 desktop:px-8 desktop:py-6', modalChildrenClassName)}
          >
            {children}
          </div>
          {isModalFooter && (
            <div
              className={`sticky bottom-0 ${footerBackground} pb-4 px-6 desktop:pb-6 desktop:px-8 z-10`}
            >
              {modalFooter}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;
