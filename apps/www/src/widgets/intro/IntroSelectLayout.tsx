'use client';

import type { Dispatch, SetStateAction } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import { IoCheckmark } from 'react-icons/io5';

import type { IntroLayoutKey, IntroWidgetConfig } from '@/types/pageBrothers.type';

import { useSlider } from '../hooks';
import type { HookFormValues } from '../types';

type LayoutKey = {
  key: IntroLayoutKey;
  title: string;
  description: string;
};

const layoutKey: LayoutKey[] = [
  {
    key: 'IMAGE_ROUND_FRAME',
    title: '비행기 창문',
    description: '비행기 창문 모양 프레임에 사진을 넣는 레이아웃',
  },
  {
    key: 'IMAGE_ARCH_FRAME',
    title: '아치 프레임',
    description: '아치형 프레임에 사진을 넣는 레이아웃',
  },
  {
    key: 'IMAGE_FLOW',
    title: '표지형 A',
    description: '텍스트 밑에 이미지를 배치하는 레이아웃',
  },
  {
    key: 'IMAGE_FLOW_REVERSE',
    title: '표지형 B',
    description: '이미지 밑에 텍스트를 놓는 레이아웃',
  },
  {
    key: 'IMAGE_BACKGROUND',
    title: '배경 이미지',
    description: '이미지 위에 텍스트를 얹는 레이아웃',
  },
  {
    key: 'ONLY_TEXT',
    title: '심플 텍스트',
    description: '이미지 없이 텍스트만 쓰는 레이아웃',
  },
  {
    key: 'ONLY_IMAGE',
    title: '이미지 직접 업로드',
    description: '텍스트 없이 이미지만 활용한 레이아웃',
  },
];

interface IntroSelectLayoutProps {
  selectedLayout: IntroLayoutKey;
  setSelectedLayout: Dispatch<SetStateAction<IntroWidgetConfig>>;
  register: UseFormRegister<HookFormValues>;
  widgetIndex: number;
}

function IntroSelectLayout({
  selectedLayout,
  setSelectedLayout,
  register,
  widgetIndex,
}: IntroSelectLayoutProps) {
  const {
    trackRef,
    handleMouseDownTouchStart,
    handleMouseMoveTouchMove,
    handleMouseUpTouchEnd,
    handleInputClick,
  } = useSlider();

  return (
    <div className="space-y-2 select-none">
      <div>
        <div className="flex items-center justify-between text-slate-600">
          <div className="font-bold">레이아웃</div>
          <div className="text-sm" />
        </div>
      </div>
      <div>
        <div
          onMouseDown={handleMouseDownTouchStart}
          onMouseMove={handleMouseMoveTouchMove}
          onMouseUp={handleMouseUpTouchEnd}
          onTouchStart={handleMouseDownTouchStart}
          onTouchMove={handleMouseMoveTouchMove}
          onTouchEnd={handleMouseUpTouchEnd}
        >
          <div className="flex items-stretch gap-2 desktop:gap-4" ref={trackRef}>
            {layoutKey.map((layout) => (
              <label
                className="relative cursor-pointer w-[calc((100%-1rem)/2)] flex-none"
                key={layout.key}
              >
                <input
                  className="peer -z-10 hidden"
                  type="radio"
                  {...register(`invitation.widgets.${widgetIndex}.config.layoutKey`)}
                  value={layout.key}
                  checked={selectedLayout === layout.key}
                  onClick={handleInputClick<IntroWidgetConfig>(setSelectedLayout, {
                    layoutKey: layout.key,
                  })}
                />
                <div className="layout-key relative h-full rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-1 peer-checked:border-indigo-600 peer-checked:shadow-violet">
                  <div className="flex items-center justify-between font-bold">{layout.title}</div>
                  <div className="mt-1">{layout.description}</div>
                </div>
                <IoCheckmark className="absolute top-4 right-4 hidden flex-none text-2xl text-indigo-700 peer-checked:block" />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroSelectLayout;
