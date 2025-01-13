'use client';

import { Label } from '@repo/shared';
import type { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import type { HookFormValues } from '../types';

interface SelectableProps {
  label: string;
  registerOption: string;
  checked: boolean;
  handleUseChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function CongratulationCheckbox({
  label,
  registerOption,
  checked,
  handleUseChange,
}: SelectableProps) {
  const { register } = useFormContext<HookFormValues>();

  return (
    <div>
      <Label
        label={label}
        addOn={
          <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
            <input
              className="no-interaction peer absolute flex-none opacity-0"
              type="checkbox"
              checked={checked}
              {...register(registerOption as keyof HookFormValues)}
              onChange={handleUseChange}
            />
            <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
          </label>
        }
      />
      <div className="text-sm text-slate-400" />
    </div>
  );
}

export default CongratulationCheckbox;
