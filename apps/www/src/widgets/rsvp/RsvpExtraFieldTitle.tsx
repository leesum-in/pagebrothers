import type { RsvpExtraField } from '@repo/shared';
import { Label } from '@repo/shared';
import { useFormContext } from 'react-hook-form';

import { WidgetLabelWithInput } from '../components';
import type { HookFormValues } from '../types';

interface RsvpExtraFieldTitleProps {
  extraField: RsvpExtraField;
  index: number;
  widgetIndex: number;
}

function RsvpExtraFieldTitle({ extraField, index, widgetIndex }: RsvpExtraFieldTitleProps) {
  const { register } = useFormContext<HookFormValues>();

  return (
    <li>
      <div className="space-y-2 ">
        <div>
          <Label label="문항 타이틀" />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-full"
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
            defaultValue={extraField.label}
            placeholder="입력하지 않으면 문항 타이틀이 생략돼요."
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.extraFields.${index}.label`}
          >
            <div className="flex flex-none items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>
    </li>
  );
}

export default RsvpExtraFieldTitle;
