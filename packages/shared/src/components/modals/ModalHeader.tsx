import React, { useState } from 'react';

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
    <div className="sticky top-0 bg-white leading-10 z-10">
      <div className="flex justify-between items-center ">
        <div className="flex items-center space-x-6">
          <h2 className="text-xl font-bold text-slate-900">{modalHeaderTitle}</h2>
          {isHeaderModalTabs && modalHeaderTabs.length > 0 && (
            <div className="flex space-x-6">
              {modalHeaderTabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={` ${
                    activeTab === index
                      ? 'text-indigo-700 border-b-2 border-indigo-700 pt-1'
                      : 'text-slate-400 border-b-2 border-transparent pt-1'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={modalHeaderOnClose} className="text-gray-500 hover:text-gray-700">
          X
        </button>
      </div>
      {isHeaderSubtitle && modalHeaderSubtitle && (
        <p className="text-sm text-slate-500 mt-2">{modalHeaderSubtitle}</p>
      )}
    </div>
  );
};

export default ModalHeader;
