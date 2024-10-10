'use client';

import { useCallback, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { useInvitationConfigMutation } from '@/invitations/mutations';
import type { ConfigData } from '@/invitations/types';
import type { VideoWidgetConfig, WidgetItem } from '@/types/pageBrothers.type';

import type { ModalStore, VideoWidgetForm } from '../zustand';
import useModalStore from '../zustand';

interface VideoWidgetModalContentProps {
  widget: WidgetItem;
}

function VideoWidgetModalContent({ widget }: VideoWidgetModalContentProps): React.ReactNode {
  const { register, watch } = useForm<VideoWidgetForm>();
  const { setOnSubmit, closeModal } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
    })),
  );

  const { invitationId } = useModalStore(
    useShallow((state: ModalStore) => ({
      invitationId: state.invitationId,
    })),
  );

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitationId);

  const onSubmit: SubmitHandler<VideoWidgetForm> = useCallback(() => {
    const configPayloadData: ConfigData = {
      id: widget.id,
      type: 'VIDEO',
      index: 0,
      config: {
        url: watch('url'),
        aspectWidth: watch('aspectWidth'),
        aspectHeight: watch('aspectHeight'),
      },
      stickers: [],
    };
    console.log('payload ====>', configPayloadData);
    putInvitationConfig(configPayloadData);

    closeModal();
  }, [widget, watch, closeModal, putInvitationConfig]);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

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
              defaultValue={(widget.config as VideoWidgetConfig).url}
              {...register('url')}
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
                defaultValue={(widget.config as VideoWidgetConfig).aspectWidth}
                {...register('aspectWidth')}
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
                defaultValue={(widget.config as VideoWidgetConfig).aspectHeight}
                {...register('aspectHeight')}
              />
              <div className="flex flex-none items-center" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoWidgetModalContent;
