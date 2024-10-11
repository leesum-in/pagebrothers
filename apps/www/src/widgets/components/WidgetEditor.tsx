'use client';

import ThemeSetting from '@/themeSetting/ThemeSetting';
import { Button } from '@repo/shared';
import { HiPlus } from 'react-icons/hi';

interface WidgetEditorProps {
  onAddWidget?: () => void;
  onPreview?: () => void;
  onShare?: () => void;
  // isEditing?: boolean;
}

function WidgetEditor({
  onAddWidget,
  onPreview,
  onShare,
  // isEditing = false
}: WidgetEditorProps) {
  return (
    <div>
      <div>
        {/* 기본 드래프트 */}
        {/* <div className="desktop:flex-1">
          <div>위젯입니다</div>
          <Button
            variants="ghost"
            size="medium"
            className="w-[25.875rem] pl-[1.25rem] pr-[0.25rem]"
          >
            위젯 추가
            <HiPlus className="text-slate-600" />
          </Button>
        </div>
        <div>
          <div>
            스타일에디터입니다
          </div>
        </div> */}
        <div className="desktop:flex-1 mx-auto w-full max-w-[26rem] space-y-6">
          {/* 임시 Widget -> Widget 컴포넌트로 대체하기 */}
          <div
            role="button"
            tabIndex={0}
            aria-disabled="false"
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-1 cursor-default"
            style={{ zIndex: 'auto' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 font-bold text-slate-900">
              <span>위젯입니다</span>
              <div className="flex gap-2">
                <Button
                  variants="fill_white"
                  size="small"
                  onClick={() => {
                    console.log('스티커 버튼 클릭됨');
                  }}
                >
                  <HiPlus className="text-slate-600" />
                  스티커
                </Button>
                <Button
                  variants="fill_secondary"
                  size="small"
                  onClick={() => {
                    console.log('위젯 수정 버튼 클릭됨');
                  }}
                >
                  위젯 수정
                </Button>
              </div>
            </div>
            {/* Body */}
            <div className="border-t border-slate-200">
              <div className="font-serif text-[14px] leading-loose text-theme-black/60">
                <div className="relative overflow-hidden">
                  <div className="relative text-center">
                    <div className="flex aspect-square items-center justify-center bg-theme-black/5 p-4 text-center leading-normal">
                      <p className="opacity-50">대표 이미지가 들어갈 자리예요</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Add Widget Button */}
          <Button variants="ghost" size="medium" onClick={onAddWidget}>
            위젯 추가
            <HiPlus className="text-slate-600" />
          </Button>
        </div>
        {/* ThemeSettings */}
        <ThemeSetting />
      </div>
      <div className="sticky bottom-0 ml-auto flex max-w-full items-center justify-end gap-4 p-4 desktop:p-8">
        <Button variants="fill_secondary" size="medium" onClick={onPreview}>
          미리보기
        </Button>
        <Button variants="fill_primary" size="medium" onClick={onShare}>
          다음: 공유 설정
        </Button>
      </div>
    </div>
  );
}

export default WidgetEditor;
