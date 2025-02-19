'use client';

import type {
  EventSequenceItem,
  EventSequenceWidgetConfig,
  EventSequenceWidgetItem,
  WidgetItem,
} from '@repo/shared';
import { LabelWithSub } from '@repo/shared';
import { useCallback, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetAddListButton, WidgetBreakLine, WidgetLabelWithInput } from '../components';
import WidgetLiTitleAndDesc from '../components/WidgetLiTitleAndDesc';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useInvitation, useWidgetIndex } from '../hooks';
import { useInvitationConfigMutation } from '../mutations';
import type { ConfigPayload, HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';

interface EventSequenceWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function EventSequenceWidgetConfigure({ widgetItem }: EventSequenceWidgetConfigureProps) {
  const widgetIndex = useWidgetIndex(widgetItem);
  const { control, register } = useFormContext<
    HookFormValues,
    `invitation.widgets.${number}.config.items`
  >();
  const { setOnSubmit, closeModal } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
    })),
  );
  const { invitation } = useInvitation();

  const {
    fields: eventSequenceFields,
    append: eventSequenceAppend,
    remove: eventSequenceRemove,
  } = useFieldArray<HookFormValues, `invitation.widgets.${number}.config.items`>({
    control,
    name: `invitation.widgets.${widgetIndex!}.config.items` as `invitation.widgets.0.config.items`,
  });

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');

  const handleRemoveClick = (index: number) => {
    eventSequenceRemove(index);
  };

  const handleAddClick = () => {
    eventSequenceAppend({
      title: '',
      description: '',
    });
  };

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(
    (data) => {
      if (!invitation || !('id' in widgetItem) || widgetIndex === null || widgetIndex === -1)
        return;
      if (!data.invitation) return;

      const configData = (data.invitation.widgets[widgetIndex] as EventSequenceWidgetItem).config;

      const config: EventSequenceWidgetConfig = {
        title: configData.title,
        align: configData.align,
        items: configData.items,
      };

      const configPayloadData: ConfigPayload = {
        id: widgetItem.id,
        type: 'EVENT_SEQUENCE',
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
        <WidgetThreeWaySelector label="텍스트 정렬" widgetItem={widgetItem} />
      </div>

      {/** 타이틀 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub
            label="타이틀"
            subLabel="입력하면 구성 위에 추가됩니다."
            addOn={<span className="text-sm text-slate-400">(선택)</span>}
          />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
            defaultValue={(widgetItem.config as EventSequenceWidgetConfig).title}
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.title`}
          />
        </div>
      </div>

      <WidgetBreakLine />

      {/** 구성 추가 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-slate-600">
          <div className="font-bold">예식 구성</div>
          <div className="text-sm" />
        </div>
        <div>
          <ul className="space-y-4">
            {(eventSequenceFields as EventSequenceItem[]).map((field, index) => (
              <WidgetLiTitleAndDesc
                key={field.title}
                titleRegister={register(
                  `invitation.widgets.${widgetIndex}.config.items.${index}.title` as keyof HookFormValues,
                )}
                descRegister={register(
                  `invitation.widgets.${widgetIndex}.config.items.${index}.description` as keyof HookFormValues,
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

export default EventSequenceWidgetConfigure;
