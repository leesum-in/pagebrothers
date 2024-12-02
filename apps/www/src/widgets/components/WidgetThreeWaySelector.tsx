'use client';

import type { CalendarWidgetConfig, GalleryWidgetConfig, WidgetItem } from '@repo/shared';
import { Label } from '@repo/shared';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FiAlignCenter, FiAlignLeft, FiAlignRight } from 'react-icons/fi';

import { useWidgetIndex } from '../hooks';
import type { HookFormValues, ThreeWayLabelValue } from '../types';
import WidgetLabelWithInput from './WidgetLabelWithInput';

const textAlignItems = [
  {
    key: 'LEFT',
    icon: <FiAlignLeft className="text-xl" />,
  },
  {
    key: 'CENTER',
    icon: <FiAlignCenter className="text-xl" />,
  },
  {
    key: 'RIGHT',
    icon: <FiAlignRight className="text-xl" />,
  },
];

interface WidgetThreeWaySelectorProps {
  label: ThreeWayLabelValue;
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
  texts?: string[];
  value?: string[];
}

function WidgetThreeWaySelector({ label, texts, widgetItem, value }: WidgetThreeWaySelectorProps) {
  const { register } = useFormContext<HookFormValues>();
  const widgetIndex = useWidgetIndex(widgetItem);
  const isTextAlign = label === '텍스트 정렬' || label === '타이틀 정렬';
  const registerOption = useMemo(() => {
    switch (label) {
      case '텍스트 정렬':
      case '타이틀 정렬':
        return `invitation.widgets.${widgetIndex}.config.align`;
      case '남은 날짜 표기':
        return `invitation.widgets.${widgetIndex}.config.differenceFormat`;
      // 수정 요망
      case '텍스트 크기':
        return `invitation.widgets.${widgetIndex}.config.textSize`;
    }
  }, [widgetIndex, label]);

  return (
    <>
      <div>
        <Label label={label} />
      </div>
      <div>
        <div className="relative z-0 flex h-12 items-stretch -space-x-[1px] bg-white w-full">
          {isTextAlign
            ? textAlignItems.map((item) => (
                <WidgetLabelWithInput
                  key={item.key}
                  labelClassName="group relative h-full w-full cursor-pointer text-sm leading-relaxed"
                  inputClassName="peer absolute inset-0 opacity-0"
                  inputType="radio"
                  inputValue={item.key}
                  register={register}
                  registerOption={registerOption}
                  inputDefaultChecked={
                    (widgetItem.config as CalendarWidgetConfig | GalleryWidgetConfig).align
                      ? (widgetItem.config as CalendarWidgetConfig | GalleryWidgetConfig).align ===
                        item.key
                      : item.key === 'CENTER'
                  }
                >
                  <span className="center-flex relative h-full w-full gap-2 border border-slate-200 px-3 text-slate-600 group-first-of-type:rounded-l-sm group-last-of-type:rounded-r-sm peer-checked:z-10 peer-checked:border-indigo-600 peer-checked:text-indigo-600 peer-focus:ring">
                    {item.icon}
                  </span>
                </WidgetLabelWithInput>
              ))
            : texts?.map((text, index) => (
                <WidgetLabelWithInput
                  key={value?.[index]}
                  labelClassName="group relative h-full w-full cursor-pointer text-sm leading-relaxed"
                  inputClassName="peer absolute inset-0 opacity-0"
                  inputType="radio"
                  inputValue={value?.[index]}
                  register={register}
                  registerOption={registerOption}
                  inputDefaultChecked={
                    (widgetItem.config as CalendarWidgetConfig).differenceFormat === value?.[index]
                  }
                >
                  <span className="center-flex relative h-full w-full gap-2 border border-slate-200 px-3 text-slate-600 group-first-of-type:rounded-l-sm group-last-of-type:rounded-r-sm peer-checked:z-10 peer-checked:border-indigo-600 peer-checked:text-indigo-600 peer-focus:ring">
                    {text}
                  </span>
                </WidgetLabelWithInput>
              ))}
        </div>
      </div>
    </>
  );
}

export default WidgetThreeWaySelector;
