'use client';

import type { MessageWidgetConfig, WidgetItem } from '@repo/shared';
import { LabelWithSub } from '@repo/shared';
import { useCallback, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '../..';
import { WidgetLabelWithInput } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useWidgetIndex } from '../hooks';
import { useInvitationConfigMutation } from '../mutations';
import type { ConfigPayload, HookFormValues } from '../types';
import useModalStore from '../zustand';

interface MessageWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function MessageWidgetConfigure({ widgetItem }: MessageWidgetConfigureProps) {
  const { watch, register } = useFormContext<HookFormValues>();
  const { setOnSubmit, invitation, closeModal } = useModalStore(
    useShallow((state) => ({
      invitation: state.invitation,
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
    })),
  );

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');

  const widgetIndex = useWidgetIndex(widgetItem);

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(() => {
    if (!invitation || widgetIndex === null || widgetIndex === -1 || !('id' in widgetItem)) return;

    const config: MessageWidgetConfig = {
      widgetTitle: watch(`invitation.widgets.${widgetIndex}.config.widgetTitle`),
      title: watch(`invitation.widgets.${widgetIndex}.config.title`) ?? '',
      size: watch(`invitation.widgets.${widgetIndex}.config.size`),
      align: watch(`invitation.widgets.${widgetIndex}.config.align`) ?? 'CENTER',
    };

    const configPayloadData: ConfigPayload = {
      id: widgetItem.id,
      type: 'MESSAGE',
      config,
      index: widgetIndex,
      stickers: [],
    };

    console.log('message configData => ', configPayloadData);
    putInvitationConfig(configPayloadData);

    closeModal();
  }, [closeModal, invitation, widgetItem, widgetIndex, watch, putInvitationConfig]);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  if (widgetIndex === null) return <FixedLoader />;

  return (
    <div className="space-y-8">
      {/* 텍스트 정렬 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector label="텍스트 정렬" widgetItem={widgetItem} />
      </div>

      {/* 텍스트 크기 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector
          label="텍스트 크기"
          texts={['작게', '보통', '크게']}
          value={['sm', 'md', 'lg']}
          widgetItem={widgetItem}
        />
      </div>

      {/* 타이틀 */}
      <div className="space-y-2">
        <div>
          <LabelWithSub
            label="타이틀"
            addOn="(선택)"
            subLabel="입력하면 위젯에 제목이 추가됩니다."
          />
        </div>
        <WidgetLabelWithInput
          labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
          inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
          placeholder="타이틀 입력"
          register={register}
          registerOption={`invitation.widgets.${widgetIndex}.config.widgetTitle`}
          defaultValue={(widgetItem.config as MessageWidgetConfig).widgetTitle}
        />
      </div>

      {/* 메세지 */}
      <div className="space-y-2">
        <div>
          <LabelWithSub label="메세지" />
        </div>
        <WidgetLabelWithInput
          labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
          isTextarea={true}
          register={register}
          registerOption={`invitation.widgets.${widgetIndex}.config.title`}
          defaultValue={(widgetItem.config as MessageWidgetConfig).title}
        />
      </div>
    </div>
  );
}

export default MessageWidgetConfigure;
