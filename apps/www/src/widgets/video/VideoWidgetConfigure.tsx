'use client';

import type { VideoWidgetConfig, WidgetItem } from '@repo/shared/src/types/pageBrothers.type';
import { useCallback, useEffect, useMemo } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui/loader';
import { useInvitationConfigMutation } from '@/www/widgets/mutations';
import type { ConfigPayload, HookFormValues } from '@/www/widgets/types';
import { getWidgetIndex } from '@/www/widgets/utils';
import type { ModalStore } from '@/www/widgets/zustand';
import useModalStore from '@/www/widgets/zustand';

interface VideoWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function VideoWidgetConfigure({ widgetItem }: VideoWidgetConfigureProps) {
  const { register } = useFormContext<HookFormValues>();
  const { invitation, setOnSubmit, closeModal } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
      invitation: state.invitation,
    })),
  );

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');

  const widgetIndex = useMemo(
    () => getWidgetIndex(invitation, widgetItem),
    [invitation, widgetItem],
  );

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(
    (data) => {
      if (!invitation || !data.invitation || !('id' in widgetItem)) return;

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

  if (widgetIndex === null) return <FixedLoader />;

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
