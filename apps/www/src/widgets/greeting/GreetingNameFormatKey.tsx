import type { GreetingNameFormatKey, WidgetItem } from '@repo/shared';
import { cn, Label } from '@repo/shared';
import { CheckIcon } from '@repo/shared/src/assets/icons';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useWidgetIndex } from '../hooks';
import type { HookFormValues } from '../types';

interface GreetingNameFormatKeyProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function GreetingNameFormatKeyList({ widgetItem }: GreetingNameFormatKeyProps) {
  const { watch, setValue } = useFormContext<HookFormValues>();

  const widgetIndex = useWidgetIndex(widgetItem);

  const withParent = watch(`invitation.widgets.${widgetIndex!}.config.withParent`);

  useEffect(() => {
    if (!widgetIndex || widgetIndex === -1) return;
    if (!withParent) {
      setValue(`invitation.widgets.${widgetIndex}.config.nameFormatKey`, 'ROLE_AND_FULL_NAME');
    } else {
      setValue(
        `invitation.widgets.${widgetIndex}.config.nameFormatKey`,
        'LEVEL_AND_FULL_NAME_WITH_PARENT',
      );
    }
  }, [withParent, widgetIndex, setValue]);

  if (!widgetIndex) return null;

  return (
    <>
      <div>
        <Label label="표기법" />
      </div>
      <div>
        <ul className="space-y-2">
          {withParent ? (
            <>
              {(
                [
                  'LEVEL_AND_FULL_NAME_WITH_PARENT',
                  'FULL_NAME_WITH_PREFIX_PARENT',
                  'ROLE_AND_FULL_NAME_WITH_PREFIX_PARENT',
                ] as const
              ).map((value) => (
                <ListItemLabelInput key={value} widgetItem={widgetItem} value={value} />
              ))}
            </>
          ) : (
            <>
              {(['ROLE_AND_FULL_NAME', 'FULL_NAME'] as const).map((value) => (
                <ListItemLabelInput key={value} widgetItem={widgetItem} value={value} />
              ))}
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default GreetingNameFormatKeyList;

interface ListItemLabelInputProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
  value: GreetingNameFormatKey;
}

function ListItemLabelInput({ widgetItem, value }: ListItemLabelInputProps) {
  const { register, watch } = useFormContext<HookFormValues>();

  const widgetIndex = useWidgetIndex(widgetItem);

  if (!widgetIndex) return null;

  const nameLayoutKey = watch(`invitation.widgets.${widgetIndex}.config.nameLayoutKey`);

  const getKeyKorean = (key: GreetingNameFormatKey) => {
    switch (key) {
      case 'LEVEL_AND_FULL_NAME_WITH_PARENT':
        return ['고영희', '고아빠 · 고엄마의 장녀'];
      case 'FULL_NAME_WITH_PREFIX_PARENT':
        return ['고영희', '부 고아빠 · 모 고엄마의 장녀'];
      case 'ROLE_AND_FULL_NAME_WITH_PREFIX_PARENT':
        return ['신부 고영희', '부 고아빠 · 모 고엄마의 장녀'];
      case 'ROLE_AND_FULL_NAME':
        return ['신부 고영희', ''];
      case 'FULL_NAME':
        return ['고영희', ''];
    }
  };

  return (
    <li>
      <label className="relative cursor-pointer">
        <input
          type="radio"
          className="peer hidden"
          value={value}
          checked={
            watch(`invitation.widgets.${widgetIndex}.config.nameFormatKey`) === value ||
            !watch(`invitation.widgets.${widgetIndex}.config.nameFormatKey`)
          }
          {...register(`invitation.widgets.${widgetIndex}.config.nameFormatKey`)}
        />
        <div
          className={cn(
            'rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600',
            nameLayoutKey === 'VERTICAL' ? '' : 'flex flex-row-reverse justify-end gap-2',
          )}
        >
          {getKeyKorean(value)[0] ? (
            <p className="font-bold text-slate-600">{getKeyKorean(value)[0]}</p>
          ) : null}
          {getKeyKorean(value)[1] ? (
            <p className="text-slate-400">{getKeyKorean(value)[1]}</p>
          ) : null}
        </div>
        <CheckIcon className="absolute inset-4 left-auto m-auto hidden flex-none text-xl text-indigo-600 peer-checked:block" />
      </label>
    </li>
  );
}
