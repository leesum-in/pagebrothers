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
  scale?: number;
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
  scale = 1,
}) => {
  // 모달 배경
  const modalBackground = `fixed inset-0 bg-blue-700 bg-opacity-30 transition-opacity duration-300 z-[${zIndex - 1} ${
    isModalOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
  }`;

  // 모달 컨테이너
  const modalContainer = `fixed bottom-0 left-0 right-0 items-end justify-center md:bottom-0 left-0 right-0 top-0 flex md:items-center  z-[${zIndex}]  transform transition-all duration-300 ${
    isModalOpen ? 'pointer-events-auto backdrop-blur-sm' : 'pointer-events-none'
  }`;

  // 모달 내용
  const modalContent = `relative bg-white w-full md:w-[480px] max-h-[90vh] rounded-t-2xl md:rounded-2xl shadow-lg flex flex-col overflow-y-auto transform transition-all duration-300 ${
    isModalOpen ? `opacity-100 translate-y-0 ` : 'opacity-0 translate-y-full md:translate-y-4 '
  }scale-${scale === 0.75 ? '75' : '100'}`;

  return ReactDOM.createPortal(
    <>
      <div className={modalBackground}></div>
      <div className={modalContainer} onClick={onCloseModal}>
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
