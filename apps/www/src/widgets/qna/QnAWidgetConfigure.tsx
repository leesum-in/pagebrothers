'use client';

import type { QnaItem, QnaWidgetConfig, QnaWidgetItem, WidgetItem } from '@repo/shared';
import { LabelWithSub } from '@repo/shared';
import { useCallback, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetAddListButton, WidgetBreakLine, WidgetLabelWithInput } from '../components';
import WidgetLiTitleAndDesc from '../components/WidgetLiTitleAndDesc';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useWidgetIndex } from '../hooks';
import { useInvitationConfigMutation } from '../mutations';
import type { ConfigPayload, HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';

interface QnAWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function QnAWidgetConfigure({ widgetItem }: QnAWidgetConfigureProps) {
  const widgetIndex = useWidgetIndex(widgetItem);
  const { control, register } = useFormContext<
    HookFormValues,
    `invitation.widgets.${number}.config.items`
  >();
  const { setOnSubmit, closeModal, invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
      invitation: state.invitation,
    })),
  );

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');

  const {
    fields: qnaFields,
    append: qnaAppend,
    remove: qnaRemove,
  } = useFieldArray<HookFormValues, `invitation.widgets.${number}.config.items`>({
    control,
    name: `invitation.widgets.${widgetIndex!}.config.items` as `invitation.widgets.0.config.items`,
  });

  const handleRemoveClick = (index: number) => {
    qnaRemove(index);
  };

  const handleAddClick = () => {
    qnaAppend({
      question: '',
      answer: '',
    });
  };

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(
    (data) => {
      if (!invitation || !('id' in widgetItem) || widgetIndex === null || widgetIndex === -1)
        return;
      if (!data.invitation) return;

      const configData = (data.invitation.widgets[widgetIndex] as QnaWidgetItem).config;

      const config: QnaWidgetConfig = {
        title: configData.title,
        align: configData.align,
        items: configData.items,
      };

      const configPayloadData: ConfigPayload = {
        id: widgetItem.id,
        type: 'QNA',
        index: widgetIndex,
        config,
        stickers: [],
      };

      putInvitationConfig(configPayloadData);
      closeModal();
    },
    [closeModal, invitation, putInvitationConfig, widgetIndex, widgetItem],
  );

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  if (widgetIndex === null) return <FixedLoader />;

  return (
    <div className="space-y-8">
      {/** 텍스트 정렬 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector label="타이틀 정렬" widgetItem={widgetItem} />
      </div>

      {/** 타이틀 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub
            label="타이틀"
            subLabel="입력하면 질의응답 목록 위에 추가됩니다."
            addOn={<span className="text-sm text-slate-400">(선택)</span>}
          />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
            defaultValue={(widgetItem.config as QnaWidgetConfig).title}
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.title`}
          />
        </div>
      </div>

      <WidgetBreakLine />

      {/** 질의 응답 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-slate-600">
          <div className="font-bold">질의응답</div>
          <div className="text-sm" />
        </div>
        <div>
          <ul className="space-y-4">
            {(qnaFields as QnaItem[]).map((field, index) => (
              <WidgetLiTitleAndDesc
                key={field.question}
                titleRegister={register(
                  `invitation.widgets.${widgetIndex}.config.items.${index}.question` as keyof HookFormValues,
                )}
                descRegister={register(
                  `invitation.widgets.${widgetIndex}.config.items.${index}.answer` as keyof HookFormValues,
                )}
                widgetIndex={widgetIndex}
                index={index}
                handleRemoveClick={handleRemoveClick}
              />
            ))}
            <li>
              <WidgetAddListButton handleAddClick={handleAddClick} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QnAWidgetConfigure;
