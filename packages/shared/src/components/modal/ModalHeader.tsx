import CloseIcon from '../../assets/icons/x.svg';

interface ModalHeaderProps {
  modalHeaderTitle: string;
  modalHeaderOnClose: () => void;
  modalHeaderTabs?: string[];
  modalHeaderSubtitle?: string;
  isHeaderModalTabs?: boolean;
  isHeaderSubtitle?: boolean;
  activeTab: number;
  onTabChange: (index: number) => void;
}

const ModalHeader = ({
  modalHeaderTitle,
  modalHeaderOnClose,
  modalHeaderTabs = [],
  modalHeaderSubtitle,
  isHeaderModalTabs = false,
  isHeaderSubtitle = false,
  activeTab,
  onTabChange,
}: ModalHeaderProps) => {
  const handleTabClick = (index: number) => {
    onTabChange(index); // 탭을 클릭할 때 활성화된 탭의 인덱스를 업데이트
  };

  return (
    <div className="w-full bg-white">
      <div
        className={`flex bg-white px-6 md:px-8 text-slate-900 gap-6 ${
          isHeaderSubtitle ? 'md:py-4' : 'md:pt-4'
        }`}
      >
        <div className={`py-4 ${isHeaderSubtitle ? 'md:pb-0 md:pt-2' : 'md:pb-4 md:pt-2'}`}>
          <div className="font-bold md:text-xl">{modalHeaderTitle}</div>
          {isHeaderSubtitle && modalHeaderSubtitle && (
            <div className="mt-1 text-sm text-slate-500 ">{modalHeaderSubtitle}</div>
          )}
        </div>
        {isHeaderModalTabs && modalHeaderTabs.length > 0 && (
          <div className="flex ">
            {modalHeaderTabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`${
                  activeTab === index
                    ? 'text-indigo-700 p-2 md:p-3 md:pb-4'
                    : 'text-slate-400 p-2 md:p-3 md:pb-4'
                }`}
              >
                <span
                  className={`${
                    activeTab === index
                      ? 'border-b-2 border-indigo-700 pb-[18px]'
                      : 'border-b-2 border-transparent'
                  }`}
                >
                  {tab}
                </span>
              </button>
            ))}
          </div>
        )}
        <div className="flex ml-auto translate-x-4 items-center md:items-start">
          <button
            type="button"
            className="flex justify-center items-center h-12 w-12 "
            onClick={modalHeaderOnClose}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
