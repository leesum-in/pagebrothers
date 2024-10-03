import { cn } from '../../../src/utils';
import CloseIcon from '../../assets/icons/CloseIcon';

interface ModalHeaderProps {
  modalHeaderTitle: string;
  modalHeaderOnClose: () => void;
  modalHeaderTabs?: string[];
  modalHeaderSubtitle?: string;
  isHeaderModalTabs?: boolean;
  isHeaderSubtitle?: boolean;
  activeTab: number;
  onTabChange: (index: number) => void;
  closeIconButtonClassName?: string;
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
  closeIconButtonClassName,
}: ModalHeaderProps) => {
  const handleTabClick = (index: number) => {
    onTabChange(index); // 탭을 클릭할 때 활성화된 탭의 인덱스를 업데이트
  };

  return (
    <div className="w-full bg-white">
      <div
        className={`flex bg-white px-6 desktop:px-8 text-slate-900 gap-6 ${
          isHeaderSubtitle ? 'desktop:py-4' : 'desktop:pt-4'
        }`}
      >
        <div
          className={`py-4 ${isHeaderSubtitle ? 'desktop:pb-0 desktop:pt-2' : 'desktop:pb-4 desktop:pt-2'}`}
        >
          <div className="font-sans text-p1b desktop:text-h4b">{modalHeaderTitle}</div>
          {isHeaderSubtitle && modalHeaderSubtitle && (
            <div className="mt-1 text-slate-500 font-sans text-p2">{modalHeaderSubtitle}</div>
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
                    ? 'text-indigo-700 p-2 desktop:p-3 desktop:pb-4'
                    : 'text-slate-400 p-2 desktop:p-3 desktop:pb-4'
                }`}
              >
                <span
                  className={`font-sans text-p1b ${
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
        <div className="flex ml-auto translate-x-4 items-center desktop:items-start">
          <button
            type="button"
            className={cn('flex justify-center items-center h-12 w-12', closeIconButtonClassName)}
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
