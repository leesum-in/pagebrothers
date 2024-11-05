'use client';

import { Label } from '@repo/shared';
import type { UseFormRegister, UseFormWatch } from 'react-hook-form';

import type { HookFormValues } from '../types';
import { formatDate } from '../utils';

interface IntroSelectDateFormatKeyProps {
  register: UseFormRegister<HookFormValues>;
  time: string | null;
  watch: UseFormWatch<HookFormValues>;
  widgetIndex: number;
}

function IntroSelectDateFormatKey({
  register,
  time,
  watch,
  widgetIndex,
}: IntroSelectDateFormatKeyProps) {
  return (
    <div className="space-y-2 ">
      <div>
        <Label label="표기법" />
        <div>
          <ul className="space-y-2">
            <li>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  className="peer hidden"
                  value="KO"
                  checked={
                    watch(`invitation.widgets.${widgetIndex}.config.dateFormatKey`) === 'KO' ||
                    !watch(`invitation.widgets.${widgetIndex}.config.dateFormatKey`)
                  }
                  {...register(`invitation.widgets.${widgetIndex}.config.dateFormatKey`)}
                />
                <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                  <p className="font-bold text-slate-600">{formatDate(time, 'KO')}</p>
                </div>
              </label>
            </li>
            <li>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  className="peer hidden"
                  value="KO_EXCLUDE_TIME"
                  checked={
                    watch(`invitation.widgets.${widgetIndex}.config.dateFormatKey`) ===
                    'KO_EXCLUDE_TIME'
                  }
                  {...register(`invitation.widgets.${widgetIndex}.config.dateFormatKey`)}
                />
                <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                  <p className="font-bold text-slate-600">{formatDate(time, 'KO_EXCLUDE_TIME')}</p>
                </div>
              </label>
            </li>
            <li>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  className="peer hidden"
                  value="EN"
                  checked={watch(`invitation.widgets.${widgetIndex}.config.dateFormatKey`) === 'EN'}
                  {...register(`invitation.widgets.${widgetIndex}.config.dateFormatKey`)}
                />
                <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                  <p className="font-bold text-slate-600">{formatDate(time, 'EN')}</p>
                </div>
              </label>
            </li>
            <li>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  className="peer hidden"
                  value="EN_EXCLUDE_TIME"
                  checked={
                    watch(`invitation.widgets.${widgetIndex}.config.dateFormatKey`) ===
                    'EN_EXCLUDE_TIME'
                  }
                  {...register(`invitation.widgets.${widgetIndex}.config.dateFormatKey`)}
                />
                <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                  <p className="font-bold text-slate-600">{formatDate(time, 'EN_EXCLUDE_TIME')}</p>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default IntroSelectDateFormatKey;
