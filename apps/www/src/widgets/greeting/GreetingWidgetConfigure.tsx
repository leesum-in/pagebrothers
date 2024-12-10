'use client';

import type {
  GreetingNameFormatKey,
  GreetingNameLayoutKey,
  GreetingWidgetConfig,
  WidgetItem,
} from '@repo/shared';
import { Label, LabelWithSub } from '@repo/shared';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetBreakLine, WidgetLabelWithInput } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import useCombobox, { useWidgetIndex } from '../hooks';
import { useInvitationConfigMutation } from '../mutations';
import type { ConfigPayload, HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';
import GreetingHostDisplay from './GreetingHostDisplay';
import GreetingNameFormatKeyList from './GreetingNameFormatKey';
import GreetingNameLayout from './GreetingNameLayout';

interface GreetingWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

const comboboxOptions = ['아들', '장남', '차남', '삼남', '딸', '장녀', '차녀', '삼녀'];

function GreetingWidgetConfigure({ widgetItem }: GreetingWidgetConfigureProps) {
  const { watch, register } = useFormContext<HookFormValues>();
  const { setOnSubmit, closeModal, invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
      invitation: state.invitation,
      openMultiModal: state.openMultiModal,
    })),
  );

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');

  const widgetIndex = useWidgetIndex(widgetItem);
  const widgetConfig = widgetItem.config as GreetingWidgetConfig;

  const { selected: groomLevelValue, Combobox: GroomCombobox } = useCombobox({
    options: comboboxOptions,
  });
  const { selected: brideLevelValue, Combobox: BrideCombobox } = useCombobox({
    options: comboboxOptions,
  });

  const groom = invitation?.owners.find((owner) => owner.role === 'GROOM');
  const bride = invitation?.owners.find((owner) => owner.role === 'BRIDE');

  const groomBrideGreetingData = useMemo(() => {
    if (!invitation) return { groomData: null, brideData: null };

    if (!groom || !bride) return { groomData: null, brideData: null };

    const groomData = Object.entries(widgetConfig.hosts).find(([key]) => key === groom.id);
    const brideData = Object.entries(widgetConfig.hosts).find(([key]) => key === bride.id);

    if (!groomData || !brideData) return { groomData: null, brideData: null };

    return {
      groomData: { id: groomData[0], ...groomData[1] },
      brideData: { id: brideData[0], ...brideData[1] },
    };
  }, [invitation, widgetConfig.hosts, groom, bride]);

  const [isDeceased, setIsDeceased] = useState({
    groomFather: groomBrideGreetingData.groomData?.isFatherDeceased ?? false,
    groomMother: groomBrideGreetingData.groomData?.isMotherDeceased ?? false,
    brideFather: groomBrideGreetingData.brideData?.isFatherDeceased ?? false,
    brideMother: groomBrideGreetingData.brideData?.isMotherDeceased ?? false,
  });

  const handleChangeDeceased = useCallback(
    (type: 'groomFather' | 'groomMother' | 'brideFather' | 'brideMother') => (value: boolean) => {
      setIsDeceased((prev) => ({ ...prev, [type]: value }));
    },
    [],
  );

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(() => {
    if (!invitation || !('id' in widgetItem) || widgetIndex === null || widgetIndex === -1) return;
    const align = watch(`invitation.widgets.${widgetIndex}.config.align`);

    if (!align) return;
    if (!groom || !bride) return;
    if (!groomBrideGreetingData.groomData) return;

    const config: GreetingWidgetConfig = {
      align,
      title: String(watch(`invitation.widgets.${widgetIndex}.config.title`)),
      nameLayoutKey: watch(
        `invitation.widgets.${widgetIndex}.config.nameLayoutKey`,
      ) as GreetingNameLayoutKey,
      nameFormatKey: watch(
        `invitation.widgets.${widgetIndex}.config.nameFormatKey`,
      ) as GreetingNameFormatKey,
      greetingText: watch(`invitation.widgets.${widgetIndex}.config.greetingText`),
      withParent: watch(`invitation.widgets.${widgetIndex}.config.withParent`),
      useFlower: watch(`invitation.widgets.${widgetIndex}.config.useFlower`),
      hosts: {
        [groom.id]: {
          ...groomBrideGreetingData.groomData,
          name: watch(
            `invitation.widgets.${widgetIndex}.config.hosts.${groomBrideGreetingData.groomData.id}.name`,
          ),
          level: groomLevelValue,
          fatherName: watch(
            `invitation.widgets.${widgetIndex}.config.hosts.${groomBrideGreetingData.groomData.id}.fatherName`,
          ),
          motherName: watch(
            `invitation.widgets.${widgetIndex}.config.hosts.${groomBrideGreetingData.groomData.id}.motherName`,
          ),
          isFatherDeceased: isDeceased.groomFather,
          isMotherDeceased: isDeceased.groomMother,
        },
        [bride.id]: {
          ...groomBrideGreetingData.brideData,
          name: watch(
            `invitation.widgets.${widgetIndex}.config.hosts.${groomBrideGreetingData.brideData.id}.name`,
          ),
          level: brideLevelValue,
          fatherName: watch(
            `invitation.widgets.${widgetIndex}.config.hosts.${groomBrideGreetingData.brideData.id}.fatherName`,
          ),
          motherName: watch(
            `invitation.widgets.${widgetIndex}.config.hosts.${groomBrideGreetingData.brideData.id}.motherName`,
          ),
          isFatherDeceased: isDeceased.brideFather,
          isMotherDeceased: isDeceased.brideMother,
        },
      },
    };

    console.log('config =======>', config);

    const configPayloadData: ConfigPayload = {
      id: widgetItem.id,
      type: 'GREETING',
      index: widgetIndex,
      config,
      stickers: [],
    };

    putInvitationConfig(configPayloadData);
    closeModal();
  }, [
    invitation,
    widgetIndex,
    watch,
    widgetItem,
    groom,
    bride,
    groomBrideGreetingData,
    groomLevelValue,
    brideLevelValue,
    isDeceased,
    putInvitationConfig,
    closeModal,
  ]);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  if (widgetIndex === null) return <FixedLoader />;

  const withParent = watch(`invitation.widgets.${widgetIndex}.config.withParent`);

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
                  checked={watch(`invitation.widgets.${widgetIndex}.config.withParent`)}
                  {...register(`invitation.widgets.${widgetIndex}.config.withParent`)}
                />
                <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
              </label>
            }
          />
          <div className="text-sm text-slate-400">호스트 정보에 혼주 정보를 추가합니다.</div>
        </div>
      </div>

      {groomBrideGreetingData.groomData ? (
        <>
          <GreetingHostDisplay
            groomBrideGreetingData={groomBrideGreetingData}
            widgetIndex={widgetIndex}
            withParent={withParent}
            isDeceased={isDeceased}
            handleChangeDeceased={handleChangeDeceased}
            Combobox={GroomCombobox}
            type="groom"
          />
          <hr className="border-t border-slate-300" />
          <GreetingHostDisplay
            groomBrideGreetingData={groomBrideGreetingData}
            widgetIndex={widgetIndex}
            withParent={withParent}
            isDeceased={isDeceased}
            handleChangeDeceased={handleChangeDeceased}
            Combobox={BrideCombobox}
            type="bride"
          />
        </>
      ) : null}

      {/** 국화 이미지로 표기 */}
      {withParent ? (
        <div className="space-y-2 ">
          <div>
            <Label
              label="故를 국화 이미지로 표기"
              addOn={
                <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
                  <input
                    className="no-interaction peer absolute flex-none opacity-0"
                    type="checkbox"
                    checked={watch(`invitation.widgets.${widgetIndex}.config.useFlower`)}
                    {...register(`invitation.widgets.${widgetIndex}.config.useFlower`)}
                  />
                  <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
                </label>
              }
            />
            <div className="text-sm text-slate-400" />
          </div>
        </div>
      ) : null}

      <WidgetBreakLine />

      {/** 혼주 정보 위치 */}
      {withParent ? (
        <div className="space-y-2 ">
          <div>
            <LabelWithSub label="혼주 정보 위치" />
          </div>
          <div>
            <GreetingNameLayout widgetItem={widgetItem} />
          </div>
        </div>
      ) : null}

      {/** 표기법 */}
      <div className="space-y-2 ">
        <GreetingNameFormatKeyList widgetItem={widgetItem} />
      </div>
    </div>
  );
}

export default GreetingWidgetConfigure;
