'use client';

import type { RsvpExtraField, RsvpWidgetConfig, WidgetItem } from '@repo/shared';
import { LabelWithSub } from '@repo/shared';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetLabelWithInput } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useWidgetIndex } from '../hooks';
import { useInvitationConfigMutation } from '../mutations';
import type { HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';
import RsvpDroppableUl from './RsvpDroppableUI';
import RsvpExtraFields from './RsvpExtraFields';

interface RsvpWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function RsvpWidgetConfigure({ widgetItem }: RsvpWidgetConfigureProps) {
  const widgetConfig = widgetItem.config as RsvpWidgetConfig;

  const [extraFields, setExtraFields] = useState<RsvpExtraField[]>(widgetConfig.extraFields);
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

      {/** 메시지 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub label="메시지" />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            defaultValue={widgetConfig.text}
            placeholder="메시지 입력"
            register={register}
            isTextarea
            textareaClassName="block w-full resize-none bg-white px-4 py-3 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300"
            registerOption={`invitation.widgets.${widgetIndex}.config.text`}
          >
            <div className="flex items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      {/** 응답 버튼 이름 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub label="응답 버튼 이름" subLabel="오른쪽이 찐한 버튼이에요." />
        </div>
        <div>
          <div className="flex gap-2">
            <WidgetLabelWithInput
              labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-full"
              inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
              defaultValue={widgetConfig.rejectLabel}
              placeholder="참석 불가시"
              register={register}
              registerOption={`invitation.widgets.${widgetIndex}.config.rejectLabel`}
            >
              <div className="flex items-center" />
            </WidgetLabelWithInput>
            <WidgetLabelWithInput
              labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-full"
              inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
              defaultValue={widgetConfig.acceptLabel}
              placeholder="참석 가능시"
              register={register}
              registerOption={`invitation.widgets.${widgetIndex}.config.acceptLabel`}
            >
              <div className="flex items-center" />
            </WidgetLabelWithInput>
          </div>
        </div>
      </div>

      {/** extraFields */}
      <div className="space-y-2">
        <div>
          <LabelWithSub
            label="문항 편집"
            subLabel="참석 여부에 답하면 묻는 추가 질문을 편집해 주세요."
          />
        </div>
        <RsvpDroppableUl<RsvpExtraField> items={extraFields} setItems={setExtraFields}>
          {extraFields.map((extraField, index) => (
            <RsvpExtraFields
              key={extraField.id}
              extraField={extraField}
              index={index}
              widgetIndex={widgetIndex}
            />
          ))}
          <button
            type="button"
            className="w-full h-12 rounded-md px-4 text-sm border border-dashed border-slate-300 !shadow-none center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
          >
            <span>구성 추가하기</span>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </RsvpDroppableUl>
      </div>
    </div>
  );
}

export default RsvpWidgetConfigure;
