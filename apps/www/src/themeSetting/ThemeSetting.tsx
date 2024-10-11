'use client';

import { Button } from '@repo/shared';
import CloseIcon from '@repo/shared/src/assets/icons/CloseIcon';
import { useState } from 'react';

const FONTS_LABEL: Record<string, string> = {
  sans: '프리텐다드',
  serif: '노토 세리프',
  gowun: '고운 바탕',
};
function ThemeSetting() {
  const [colorScheme, setColorScheme] = useState('black');
  const [font, setFont] = useState('sans');
  const [textSize, setTextSize] = useState('md');

  return (
    <div className="mx-auto w-full max-w-[26rem] desktop:max-w-[22.5rem] desktop:flex-none desktop:self-start sticky top-[5.5rem] hidden desktop:block">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-1">
        <header className="sticky top-0 z-10 border-b border-slate-100 bg-white desktop:bg-transparent">
          <div className="center-flex h-12 desktop:hidden">
            <p className="pl-4 text-sm font-bold">테마 설정</p>
            <Button
              variants="ghost"
              size="small"
              onClick={() => {
                console.log('닫기 버튼 클릭됨');
              }}
            >
              <CloseIcon />
            </Button>
          </div>
          <ul className="flex items-center gap-2 px-2 text-sm desktop:px-4 desktop:pt-2">
            <li>
              <Button
                variants="text_primary"
                size="small"
                onClick={() => {
                  console.log('스타일 버튼 클릭됨');
                }}
              >
                스타일
              </Button>
            </li>
            <li>
              <Button
                variants="text_secondary"
                size="small"
                onClick={() => {
                  console.log('상세 설정 버튼 클릭됨');
                }}
              >
                상세 설정
              </Button>
            </li>
          </ul>
        </header>

        <form className="p-4 desktop:p-6">
          {/* Color Scheme */}
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="font-bold">Color Scheme</p>
              <ul className="grid grid-cols-4 gap-1">
                {[
                  'black',
                  'slate',
                  'stone',
                  'rose',
                  'orange',
                  'yellow',
                  'lime',
                  'emerald',
                  'sky',
                  'blue',
                  'indigo',
                  'violet',
                ].map((scheme) => (
                  <li key={scheme} className="flex-none">
                    <label
                      className="block cursor-pointer text-center"
                      htmlFor={scheme}
                      aria-label={scheme}
                    >
                      <input
                        id={scheme}
                        type="radio"
                        className="peer hidden"
                        name="design.brandColor"
                        value={scheme}
                        checked={colorScheme === scheme}
                        onChange={() => {
                          setColorScheme(scheme);
                        }}
                      />
                      <div className="space-y-2 rounded-sm pt-3 pb-2 peer-checked:bg-white peer-checked:shadow-violet peer-checked:ring-slate-200">
                        <div className="mx-auto flex h-8 w-8 rotate-45 flex-col overflow-hidden rounded-full border bg-white shadow-md" />
                        <p className="scale-90 whitespace-nowrap text-xs font-bold leading-none tracking-wider text-theme-colored">
                          {scheme.toUpperCase()}
                        </p>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="border-t border-slate-200" />
          </div>
          {/* Font */}
          <div className="space-y-1">
            <p className="font-bold">Font</p>
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 text-sm h-10">
              {['sans', 'serif', 'gowun'].map((fontType) => (
                <label
                  key={fontType}
                  className="group relative flex-1 cursor-pointer text-center h-8"
                >
                  <input
                    name="design.font"
                    type="radio"
                    className="peer absolute cursor-pointer opacity-0"
                    value={fontType}
                    checked={font === fontType}
                    onChange={() => {
                      setFont(fontType);
                    }}
                  />
                  <span className="center-flex h-full w-full rounded-md text-slate-500 peer-checked:border peer-checked:border-slate-200 peer-checked:bg-white peer-checked:font-bold peer-checked:text-slate-600">
                    {FONTS_LABEL[fontType]}
                  </span>
                </label>
              ))}
            </div>
            <hr className="border-t border-slate-200" />
          </div>
          {/* Text Size */}
          <div className="space-y-1">
            <p className="font-bold">Text Size</p>
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 text-sm h-10">
              {['sm', 'md', 'lg'].map((size) => (
                <label
                  key={size}
                  className="group relative flex-1 cursor-pointer text-center h-8"
                  htmlFor={size}
                  aria-label={size}
                >
                  <input
                    id={size}
                    name="design.textSize"
                    type="radio"
                    className="peer absolute cursor-pointer opacity-0"
                    value={size}
                    checked={textSize === size}
                    onChange={() => {
                      setTextSize(size);
                    }}
                  />
                  <span className="center-flex h-full w-full rounded-md text-slate-500 peer-checked:border peer-checked:border-slate-200 peer-checked:bg-white peer-checked:font-bold peer-checked:text-slate-600">
                    {size === 'sm' && <span className="text-[12px]">가A</span>}
                    {size === 'md' && <span className="text-[14px]">가A</span>}
                    {size === 'lg' && <span className="text-[16px]">가A</span>}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ThemeSetting;
