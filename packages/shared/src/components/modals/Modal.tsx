import React from 'react';
import ReactDOM from 'react-dom';

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
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  onCloseModal,
  children,
  isModalHeader,
  isModalFooter,
  modalHeader,
  modalFooter,
  zIndex = 50,
  isMultiModal = false,
}) => {
  const modalBackground = `fixed inset-0 bg-blue-800 bg-opacity-15 flex justify-center items-end md:items-center z-[${zIndex}] transform transition-opacity duration-300 ${
    isModalOpen
      ? 'pointer-events-auto backdrop-blur-sm opacity-100'
      : 'pointer-events-none opacity-0'
  }`;

  const multiModalWidth = isMultiModal ? 'max-w-sm' : 'md:w-[480px]';

  const modalContent = `relative bg-white w-full ${multiModalWidth} max-h-[90vh] rounded-t-2xl md:rounded-2xl shadow-lg flex flex-col overflow-y-auto transform transition-all duration-300 ${
    isModalOpen ? `opacity-100 translate-y-0` : 'opacity-0 translate-y-full md:translate-y-4'
  }`;

  return ReactDOM.createPortal(
    <>
      <div className={modalBackground} onClick={onCloseModal}>
        <div className={modalContent} onClick={(e) => e.stopPropagation()}>
          {isModalHeader && (
            <div className="sticky top-0 bg-white border-b pt-4 px-8 z-10">{modalHeader}</div>
          )}
          <div className="flex-grow px-8 pt-6">{children}</div>
          {isModalFooter && (
            <div className="sticky bottom-0 bg-white pt-4 pb-6 px-8 z-10">{modalFooter}</div>
          )}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default Modal;
