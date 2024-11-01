'use client';

import { useCallback, useEffect, useMemo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import type { VideoWidgetConfig, WidgetItem } from '@/types/pageBrothers.type';

import { useInvitationConfigMutation } from '../mutations';
import type { ConfigPayload, HookFormValues } from '../types';
import { getWidgetIndex } from '../utils';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';

interface VideoWidgetConfigureProps {
  widgetItem: WidgetItem;
}

function VideoWidgetConfigure({ widgetItem }: VideoWidgetConfigureProps): React.ReactNode {
  const { register } = useFormContext<HookFormValues>();
  const { setOnSubmit, closeModal } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
    })),
  );

  const { invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      invitation: state.invitation,
    })),
  );

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');

  const widgetIndex = useMemo(
    () => getWidgetIndex(invitation, widgetItem.type),
    [invitation, widgetItem.type],
  );

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(
    (data) => {
      if (!invitation || !data.invitation) return;

      const widgets = data.invitation.widgets;
      const videoWidget = widgets.find((widget) => widget.type === 'VIDEO');

      if (!videoWidget) {
        console.error('Video widget not found');
        return;
      }
      const videoWidgetConfig = videoWidget.config;

      const configPayloadData: ConfigPayload = {
        id: widgetItem.id,
        type: 'VIDEO',
        index: invitation.widgets.findIndex((item) => item.id === widgetItem.id),
        config: {
          url: videoWidgetConfig.url,
          aspectWidth: Number(videoWidgetConfig.aspectWidth),
          aspectHeight: Number(videoWidgetConfig.aspectHeight),
        },
        stickers: [],
      };
      console.log('payload ====>', configPayloadData);

      putInvitationConfig(configPayloadData);
      closeModal();
    },
    [widgetItem, closeModal, putInvitationConfig, invitation],
  );

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  if (!widgetIndex) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">동영상 URL</div>
            <div className="text-sm" />
          </div>
          <div className="text-sm text-slate-400">
            Youtube나 Vimeo에 업로드된 동영상 URL을 입력해주세요.
          </div>
        </div>
        <div>
          <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 ">
            <span className="hidden">Input label</span>
            <div className="flex flex-none items-center" />
            <input
              className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
              spellCheck="false"
              autoComplete="off"
              placeholder="Youtube, Vimeo 동영상 주소"
              defaultValue={(widgetItem.config as VideoWidgetConfig).url}
              {...register(`invitation.widgets.${widgetIndex}.config.url`)}
            />
            <div className="flex flex-none items-center" />
          </label>
        </div>
      </div>
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">동영상 비율</div>
            <div className="text-sm" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-0 flex-1">
              <span className="hidden">Input label</span>
              <div className="flex flex-none items-center" />
              <input
                className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
                spellCheck="false"
                autoComplete="off"
                type="number"
                placeholder="가로"
                defaultValue={(widgetItem.config as VideoWidgetConfig).aspectWidth}
                {...register(`invitation.widgets.${widgetIndex}.config.aspectWidth`)}
              />
              <div className="flex flex-none items-center" />
            </label>
            <span>:</span>
            <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-0 flex-1">
              <span className="hidden">Input label</span>
              <div className="flex flex-none items-center" />
              <input
                className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
                spellCheck="false"
                autoComplete="off"
                type="number"
                placeholder="세로"
                defaultValue={(widgetItem.config as VideoWidgetConfig).aspectHeight}
                {...register(`invitation.widgets.${widgetIndex}.config.aspectHeight`)}
              />
              <div className="flex flex-none items-center" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoWidgetConfigure;
