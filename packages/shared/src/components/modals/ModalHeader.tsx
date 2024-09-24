import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalHeaderProps {
  modalHeaderTitle: string;
  modalHeaderOnClose: () => void;
  modalHeaderTabs?: string[];
  modalHeaderSubtitle?: string;
  isHeaderModalTabs?: boolean;
  isHeaderSubtitle?: boolean;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  modalHeaderTitle,
  modalHeaderOnClose,
  modalHeaderTabs = [],
  modalHeaderSubtitle,
  isHeaderModalTabs = true,
  isHeaderSubtitle = true,
}) => {
  const [activeTab, setActiveTab] = useState(0); // 처음에 첫 번째 탭을 활성화
  const handleTabClick = (index: number) => {
    setActiveTab(index); // 탭을 클릭할 때 활성화된 탭의 인덱스를 업데이트
  };

  return (
    <div className="sticky top-0 bg-white z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h2 className="text-xl font-bold text-slate-900 py-4 pt-2">{modalHeaderTitle}</h2>
          {isHeaderModalTabs && modalHeaderTabs.length > 0 && (
            <div className="flex space-x-6">
              {modalHeaderTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={` ${
                    activeTab === index
                      ? 'text-indigo-700 border-b-2 border-indigo-700 leading-[3rem] pb-1'
                      : 'text-slate-400 border-b-2 border-transparent pb-1'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={modalHeaderOnClose}
          className="flex items-center justify-center h-12 w-12 text-gray-500 hover:text-gray-700 pb-1"
        >
          <IoClose className="text-2xl" />
        </button>
      </div>
      {isHeaderSubtitle && modalHeaderSubtitle && (
        <p className="text-sm text-slate-500 mt-2">{modalHeaderSubtitle}</p>
      )}
    </div>
  );
};

export default ModalHeader;
