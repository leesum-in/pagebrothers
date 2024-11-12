'use client';

import { Label } from '@repo/shared';
import { useFormContext } from 'react-hook-form';

import type { HookFormValues } from '../types';
import WidgetLabelWithInput from './WidgetLabelWithInput';

interface WidgetThreeWaySelectorProps {
  label: string;
  items: React.ReactNode[];
  value: string[];
  registerOption: string;
}

function WidgetThreeWaySelector({
  label,
  items,
  value,
  registerOption,
}: WidgetThreeWaySelectorProps) {
  const { register } = useFormContext<HookFormValues>();

  return (
    <>
      <div>
        <Label label={label} />
      </div>
      <div>
        <div className="relative z-0 flex h-12 items-stretch -space-x-[1px] bg-white w-full">
          {items.map((item, index) => (
            <WidgetLabelWithInput
              key={value[index]}
              labelClassName="group relative h-full w-full cursor-pointer text-sm leading-relaxed"
              inputClassName="peer absolute inset-0 opacity-0"
              inputType="radio"
              inputValue={value[index]}
              register={register}
              registerOption={registerOption}
            >
              <span className="center-flex relative h-full w-full gap-2 border border-slate-200 px-3 text-slate-600 group-first-of-type:rounded-l-sm group-last-of-type:rounded-r-sm peer-checked:z-10 peer-checked:border-indigo-600 peer-checked:text-indigo-600 peer-focus:ring">
                {item}
              </span>
            </WidgetLabelWithInput>
          ))}
        </div>
      </div>
    </>
  );
}

export default WidgetThreeWaySelector;
