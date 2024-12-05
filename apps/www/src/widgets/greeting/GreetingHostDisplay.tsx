'use client';

import { Checkbox, LabelWithSub } from '@repo/shared';
import { useFormContext } from 'react-hook-form';

import { WidgetLabelWithInput } from '../components';
import type { HookFormValues } from '../types';

interface HostData {
  name: string;
  level: string;
  fatherName: string;
  motherName: string;
  isFatherDeceased: boolean;
  isMotherDeceased: boolean;
  id: string;
}

interface GroomBrideGreetingData {
  groomData: HostData;
  brideData: HostData;
}

interface GreetingHostDisplayProps {
  groomBrideGreetingData: GroomBrideGreetingData;
  widgetIndex: number;
  isDeceased: {
    groomFather: boolean;
    groomMother: boolean;
    brideFather: boolean;
    brideMother: boolean;
  };
  type: 'groom' | 'bride';
  handleChangeDeceased: (
    type: 'groomFather' | 'groomMother' | 'brideFather' | 'brideMother',
  ) => (value: boolean) => void;
  Combobox: () => React.ReactNode;
}

function GreetingHostDisplay({
  groomBrideGreetingData,
  widgetIndex,
  isDeceased,
  type,
  handleChangeDeceased,
  Combobox,
}: GreetingHostDisplayProps) {
  const { register } = useFormContext<HookFormValues>();

  return (
    <>
      {/** 정보 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {/** 이름 */}
        <div className="space-y-2 col-span-1">
          <div>
            <LabelWithSub label={`${type === 'groom' ? '🤵 신랑' : '👰 신부'} 이름`} />
          </div>
          <div>
            <WidgetLabelWithInput
              labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
              inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
              defaultValue={groomBrideGreetingData[`${type}Data`].name}
              register={register}
              registerOption={`invitation.widgets.${widgetIndex}.config.hosts.${groomBrideGreetingData[`${type}Data`].id}.name`}
            >
              <div className="flex items-center" />
            </WidgetLabelWithInput>
          </div>
        </div>
        {/** 서열 */}
        <div className="space-y-2">
          <div>
            <LabelWithSub label="서열 표기" />
          </div>
          {Combobox()}
        </div>
        {/** 아버지 */}
        <div className="space-y-2">
          <div>
            <LabelWithSub label={`${type === 'groom' ? '신랑' : '신부'} 아버지`} />
          </div>
          <div>
            <WidgetLabelWithInput
              labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
              inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
              defaultValue={groomBrideGreetingData[`${type}Data`].fatherName}
              placeholder="입력하지 않으면"
              register={register}
              registerOption={`invitation.widgets.${widgetIndex}.config.hosts.${groomBrideGreetingData[`${type}Data`].id}.fatherName`}
            >
              <div className="flex items-center" />
            </WidgetLabelWithInput>
            <Checkbox
              labelText="앞에 故 표기"
              isSpan
              className="mt-1"
              checked={isDeceased[`${type}Father`]}
              onChange={handleChangeDeceased(`${type}Father`)}
            />
          </div>
        </div>
        {/** 어머니 */}
        <div className="space-y-2">
          <div>
            <LabelWithSub label={`${type === 'groom' ? '신랑' : '신부'} 어머니`} />
          </div>
          <div>
            <WidgetLabelWithInput
              labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
              inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
              defaultValue={groomBrideGreetingData[`${type}Data`].motherName}
              placeholder="표기되지 않아요"
              register={register}
              registerOption={`invitation.widgets.${widgetIndex}.config.hosts.${groomBrideGreetingData[`${type}Data`].id}.motherName`}
            >
              <div className="flex items-center" />
            </WidgetLabelWithInput>
            <Checkbox
              labelText="앞에 故 표기"
              isSpan
              className="mt-1"
              checked={isDeceased[`${type}Mother`]}
              onChange={handleChangeDeceased(`${type}Mother`)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GreetingHostDisplay;
