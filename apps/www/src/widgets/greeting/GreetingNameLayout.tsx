import type { GreetingWidgetConfig, WidgetItem } from '@repo/shared';
import { useFormContext } from 'react-hook-form';

import { Horizontal, Vertical } from '@/www/ui';

import { WidgetLabelWithInput } from '../components';
import { useWidgetIndex } from '../hooks';
import type { HookFormValues } from '../types';

const GreetingNameLayoutKeys = [
  {
    key: 'VERTICAL',
    label: '호스트 아래',
  },
  {
    key: 'HORIZONTAL',
    label: '호스트와 나란히',
  },
] as const;

interface GreetingNameLayoutProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function GreetingNameLayout({ widgetItem }: GreetingNameLayoutProps) {
  const { register } = useFormContext<HookFormValues>();
  const widgetIndex = useWidgetIndex(widgetItem);

  return (
    <div className="relative z-0 flex h-12 items-stretch -space-x-[1px] bg-white ">
      {GreetingNameLayoutKeys.map((key) => (
        <WidgetLabelWithInput
          key={`${key.key}input`}
          labelClassName="group relative h-full w-full cursor-pointer text-sm leading-relaxed"
          inputClassName="peer absolute inset-0 opacity-0"
          inputType="radio"
          inputValue={key.key}
          register={register}
          registerOption={`invitation.widgets.${widgetIndex}.config.nameLayoutKey`}
          inputDefaultChecked={
            (widgetItem.config as GreetingWidgetConfig).nameLayoutKey === key.key
          }
        >
          <span className="center-flex relative h-full w-full gap-2 border border-slate-200 px-3 text-slate-600 group-first-of-type:rounded-l-sm group-last-of-type:rounded-r-sm peer-checked:z-10 peer-checked:border-indigo-600 peer-checked:text-indigo-600 peer-focus:ring">
            {key.key === 'VERTICAL' ? (
              <>
                <Vertical className="h-6 w-6" />
                {key.label}
              </>
            ) : (
              <>
                <Horizontal className="h-6 w-6" />
                {key.label}
              </>
            )}
          </span>
        </WidgetLabelWithInput>
      ))}
    </div>
  );
}

export default GreetingNameLayout;
