'use client';

import { Label, LabelWithSub, type GreetingWidgetConfig, type WidgetItem } from '@repo/shared';
import { useCallback, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetLabelWithInput } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useWidgetIndex } from '../hooks';
import type { HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';

interface GreetingWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

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
    </div>
  );
}

export default GreetingWidgetConfigure;
