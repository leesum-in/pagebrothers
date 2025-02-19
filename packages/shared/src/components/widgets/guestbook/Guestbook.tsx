import { GuestbookWidgetConfig, IInvitation, WidgetItem } from '@/shared/types';
import { FiPenTool } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';

interface GuestbookProps {
  widgetItem?: WidgetItem;
  isMultiModal?: boolean;
}
function Guestbook({ widgetItem, isMultiModal = false }: GuestbookProps) {
  console.log(widgetItem?.config as GuestbookWidgetConfig);

  const PAGESISTERS_GUESTBOOK = {
    name: '페이지 시스터즈팀',
    time: '3분전',
    comment: `두 분의 결혼을 진심으로 축하드립니다 😊 \n 행복하고 좋은 일만 가득하시길 바랄게요!`,
  };

  return (
    <div className="no-interaction p-8 space-y-6">
      {/* 제목 영역 */}
      <div className="flex justify-between">
        <p className="text-em-lg text-theme-inter/70 font-black">방명록</p>
        <button
          type="button"
          className="flex-none gap-1 whitespace-nowrap !border-theme-colored/20 !bg-theme-colored/5 !text-theme-inter/70 hover:!bg-theme-colored/10 h-8 rounded-sm px-2 text-xs border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
        >
          <FiPenTool />
          방명록 남기기
        </button>
      </div>

      {/* 내용 영역 */}
      <div className="relative">
        <ul className="space-y-6">
          <li>
            <div className="relative flex items-start gap-3 text-sm">
              <div className="center-flex h-8 w-8 flex-none rounded-full bg-black/80 text-xl text-black">
                🐰
              </div>
              <div className="flex-1">
                <div className="relative flex items-center gap-2">
                  <div className="w-0 flex-1 truncate">
                    <span className="mr-2 font-bold">{PAGESISTERS_GUESTBOOK.name}</span>
                    <span className="opacity-50">{PAGESISTERS_GUESTBOOK.time}</span>
                  </div>
                  <button>
                    <BsThreeDots />
                  </button>
                </div>
                <div className="space-y-3 whitespace-pre-line empty:hidden  ">
                  <p>{PAGESISTERS_GUESTBOOK.comment}</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Guestbook;
