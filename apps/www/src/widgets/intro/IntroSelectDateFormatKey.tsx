import type { UseFormRegister, UseFormWatch } from 'react-hook-form';

import type { IntroWidgetConfig } from '@/types/pageBrothers.type';

import { formatDate } from '../utils';

interface IntroSelectDateFormatKeyProps {
  register: UseFormRegister<IntroWidgetConfig>;
  time: string | null;
  watch: UseFormWatch<IntroWidgetConfig>;
}

function IntroSelectDateFormatKey({ register, time, watch }: IntroSelectDateFormatKeyProps) {
  return (
    <div className="space-y-2 ">
      <div>
        <div className="flex items-center justify-between text-slate-600">
          <div className="font-bold">표기법</div>
          <div className="text-sm" />
        </div>
        <div>
          <ul className="space-y-2">
            <li>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  className="peer hidden"
                  value="KO"
                  checked={watch('dateFormatKey') === 'KO' || !watch('dateFormatKey')}
                  {...register('dateFormatKey')}
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
                  checked={watch('dateFormatKey') === 'KO_EXCLUDE_TIME'}
                  {...register('dateFormatKey')}
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
                  checked={watch('dateFormatKey') === 'EN'}
                  {...register('dateFormatKey')}
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
                  checked={watch('dateFormatKey') === 'EN_EXCLUDE_TIME'}
                  {...register('dateFormatKey')}
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
