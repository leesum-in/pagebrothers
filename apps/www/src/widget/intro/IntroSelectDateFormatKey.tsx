import { memo } from 'react';
import type { UseFormRegister } from 'react-hook-form';

import type { IntroWidgetConfig, WidgetItem } from '@/types/pageBrothers.type';

interface IntroSelectDateFormatKeyProps {
  widget: WidgetItem;
  register: UseFormRegister<IntroWidgetConfig>;
}

function SelectDateFormatKey({ widget, register }: IntroSelectDateFormatKeyProps) {
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
                  checked={(widget.config as IntroWidgetConfig).dateFormatKey === 'KO'}
                  {...register('dateFormatKey')}
                />
                <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                  <p className="font-bold text-slate-600">2024년 10월 11일 금요일 오전 1시 26분</p>
                </div>
              </label>
            </li>
            <li>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  className="peer hidden"
                  value="KO_EXCLUDE_TIME"
                  checked={(widget.config as IntroWidgetConfig).dateFormatKey === 'KO_EXCLUDE_TIME'}
                  {...register('dateFormatKey')}
                />
                <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                  <p className="font-bold text-slate-600">2024년 10월 11일 금요일</p>
                </div>
              </label>
            </li>
            <li>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  className="peer hidden"
                  value="EN"
                  checked={(widget.config as IntroWidgetConfig).dateFormatKey === 'EN'}
                  {...register('dateFormatKey')}
                />
                <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                  <p className="font-bold text-slate-600">2024. 10. 11. (FRI) 1:26 AM</p>
                </div>
              </label>
            </li>
            <li>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  className="peer hidden"
                  value="EN_EXCLUDE_TIME"
                  checked={(widget.config as IntroWidgetConfig).dateFormatKey === 'EN_EXCLUDE_TIME'}
                  {...register('dateFormatKey')}
                />
                <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                  <p className="font-bold text-slate-600">2024. 10. 11. (FRI)</p>
                </div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const IntroSelectDateFormatKey = memo(SelectDateFormatKey);
export default IntroSelectDateFormatKey;
