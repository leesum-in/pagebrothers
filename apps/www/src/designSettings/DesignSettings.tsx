import type { IInvitationDesign } from '@repo/shared';
import { useState } from 'react';

import DesignSelector from './DesignSelector';

function DesignSettings() {
  const [design, setDesign] = useState<IInvitationDesign>({
    layoutType: 'WIDGETS',
    brandColor: 'slate',
    font: 'sans',
    textSize: 'sm',
    zoomDisabled: 'none',
  });

  const handleDesignChange = (newDesign: Partial<IInvitationDesign>): void => {
    setDesign((prevDesign) => ({
      ...prevDesign,
      ...newDesign,
    }));
  };

  return (
    <div className="mx-auto w-full max-w-[26rem] desktop:max-w-[22.5rem] desktop:flex-none desktop:self-start sticky top-[5.5rem] hidden !w-[20rem] desktop:block">
      <div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-1">
          <div>
            <header className="sticky top-0 z-10 border-b border-slate-100 bg-white desktop:bg-transparent">
              {/* 모바일은 테마 세팅창이 nav로 이동 */}
              <div className="center-flex h-12 desktop:hidden">
                <p className="pl-4 text-sm font-bold">테마 설정</p>
                <button type="button" className="center-flex ml-auto h-12 w-12">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-lg"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              {/* 데스크탑 */}
              <ul className="flex items-center gap-2 px-2 text-sm desktop:px-4 desktop:pt-2">
                <li>
                  <button
                    type="button"
                    className="border-b-2 p-2 font-bold border-indigo-700 text-indigo-700"
                  >
                    스타일
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="border-b-2 p-2 font-bold border-transparent text-slate-400"
                  >
                    상세 설정
                  </button>
                </li>
              </ul>
            </header>
            <DesignSelector design={design} onDesignChange={handleDesignChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignSettings;
