'use client';

import { Label, LabelWithSub, type GreetingWidgetConfig, type WidgetItem } from '@repo/shared';
import { useCallback, useEffect, useMemo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetLabelWithInput } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import useCombobox, { useWidgetIndex } from '../hooks';
import type { HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';

interface GreetingWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

const comboboxOptions = ['아들', '장남', '차남', '삼남', '딸', '장녀', '차녀', '삼녀'];

function GreetingWidgetConfigure({ widgetItem }: GreetingWidgetConfigureProps) {
  const { watch, register, setValue } = useFormContext<HookFormValues>();
  const { setOnSubmit, closeModal, invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
      invitation: state.invitation,
      openMultiModal: state.openMultiModal,
    })),
  );

  const widgetIndex = useWidgetIndex(widgetItem);
  const widgetConfig = widgetItem.config as GreetingWidgetConfig;

  const { selected: groomValue, Combobox: GroomCombobox } = useCombobox({
    options: comboboxOptions,
  });

  const groomBrideGreetingData = useMemo(() => {
    if (!invitation) return { groomData: null, brideData: null };
    const groomData = Object.entries(widgetConfig.hosts).find(([key]) =>
      invitation.owners.find((owner) => owner.id === key),
    );
    const brideData = Object.entries(widgetConfig.hosts).find(([key]) =>
      invitation.owners.find((owner) => owner.id === key),
    );
    if (!groomData || !brideData) return { groomData: null, brideData: null };
    return {
      groomData: { id: groomData[0], ...groomData[1] },
      brideData: { id: brideData[0], ...brideData[1] },
    };
  }, [invitation, widgetConfig.hosts]);

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(() => {
    if (!invitation || !('id' in widgetItem) || widgetIndex === null || widgetIndex === -1) return;

    // const config: GreetingWidgetConfig = {
    //   title: watch(`invitation.widgets.${widgetIndex}.config.title`),
    // };
  }, [invitation, widgetIndex, watch, widgetItem]);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  if (widgetIndex === null) return <FixedLoader />;

  return (
    <div className="space-y-8">
      {/** 텍스트 정렬 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector label="텍스트 정렬" widgetItem={widgetItem} />
      </div>

      {/** 타이틀 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub
            label="타이틀"
            subLabel="입력하면 인사말 위에 추가됩니다."
            addOn={<span className="text-sm text-slate-400">(선택)</span>}
          />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
            defaultValue={widgetConfig.title}
            placeholder="타이틀 입력"
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.title`}
          >
            <div className="flex items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      {/** 인사말 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub label="인사말" />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            defaultValue={widgetConfig.greetingText}
            placeholder="인사말 입력"
            register={register}
            isTextarea
            textareaClassName="block w-full resize-none bg-white px-4 py-3 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300"
            registerOption={`invitation.widgets.${widgetIndex}.config.greetingText`}
          >
            <div className="flex items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      {/** 혼주 표기 추가 */}
      <div className="space-y-2 ">
        <div>
          <Label
            label="혼주 표기 추가"
            addOn={
              <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
                <input
                  className="no-interaction peer absolute flex-none opacity-0"
                  type="checkbox"
                  checked={widgetConfig.withParent}
                  // onClick={handleClickShowParent}
                  {...register(`invitation.widgets.${widgetIndex}.config.withParent`)}
                />
                <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
              </label>
            }
          />
          <div className="text-sm text-slate-400">인트로에 예식 장소와 일시를 보여줍니다.</div>
        </div>
      </div>

      {/** 정보 */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {/** 신랑 이름 */}
        <div className="space-y-2 col-span-1">
          <div>
            <LabelWithSub label="🤵 신랑 이름" />
          </div>
          <div>
            <WidgetLabelWithInput
              labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
              inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
              defaultValue={groomBrideGreetingData.groomData?.name}
              register={register}
              registerOption={`invitation.widgets.${widgetIndex}.config.hosts.${groomBrideGreetingData.groomData?.id}.name`}
            >
              <div className="flex items-center" />
            </WidgetLabelWithInput>
          </div>
        </div>
        {/** 신랑 서열 */}
        <div className="space-y-2">
          <div>
            <LabelWithSub label="서열 표기" />
          </div>
          {GroomCombobox()}
        </div>
      </div>
    </div>
  );
}

export default GreetingWidgetConfigure;
