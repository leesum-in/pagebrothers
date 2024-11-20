'use client';

import { LabelWithSub } from '@repo/shared';
import type { GalleryWidgetConfig, WidgetItem } from '@repo/shared/src/types/pageBrothers.type';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { LuPlusCircle } from 'react-icons/lu';

import { WidgetBreakLine, WidgetLabelWithInput } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useWidgetIndex } from '../hooks';
import type { HookFormValues } from '../types';
import GalleryCarouselAlign from './GalleryCarouselAlign';
import GalleryLayout from './GalleryLayout';

interface GalleryWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function GalleryWidgetConfigure({ widgetItem }: GalleryWidgetConfigureProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { watch, register } = useFormContext<HookFormValues>();

  const widgetIndex = useWidgetIndex(widgetItem);

  return (
    <div className="space-y-8">
      {/** 타이틀 정렬 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector label="타이틀 정렬" widgetItem={widgetItem} />
      </div>

      {/** 타이틀 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub label="타이틀" subLabel="타이틀을 추가하면 레이아웃이 조금 조정돼요." />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            defaultValue={(widgetItem.config as GalleryWidgetConfig).title}
            register={register}
            placeholder="타이틀 입력"
            registerOption={`invitation.widgets.${widgetIndex}.config.title`}
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
          >
            <div className="flex flex-none items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      {/** 레이아웃 */}
      <div className="space-y-2">
        <GalleryLayout register={register} widgetItem={widgetItem} />
      </div>

      <WidgetBreakLine />

      {/** 슬라이더 정렬 */}
      <div className="space-y-2">
        <GalleryCarouselAlign widgetItem={widgetItem} register={register} />
      </div>

      {/** 사진 업로드 */}
      <div className="space-y-2">
        <div>
          <LabelWithSub
            label="사진 업로드"
            subLabel="사진을 끌어서 순서를 바꿀 수 있어요"
            addOn="개수 제한 없음"
            addOnClassName="text-sm text-slate-400"
          />
        </div>
        <div>
          <ul className="grid grid-cols-3 gap-4">
            <li className="center-flex relative flex aspect-square overflow-hidden rounded-lg border border-dashed border-slate-300">
              <input
                className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 file:cursor-pointer"
                type="file"
                accept="image/png, image/jpeg"
                multiple
              />
              <LuPlusCircle className="text-2xl text-slate-600" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GalleryWidgetConfigure;
