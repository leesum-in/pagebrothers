'use client';

import { Button, cn, Label, LabelWithSub } from '@repo/shared';
import Intro from '@repo/shared/src/components/widgets/intro/Intro';
import type {
  IntroDateFormatKey,
  IntroLayoutKey,
  IntroWidgetConfig,
  WidgetItem,
} from '@repo/shared/src/types/pageBrothers.type';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useFormContext, type SubmitHandler } from 'react-hook-form';
import { LuPlusCircle } from 'react-icons/lu';
import { useShallow } from 'zustand/shallow';

import { FixedLoader, Loader } from '@/www/ui/loader';
import { WidgetAddress, WidgetBreakLine, WidgetLabelWithInput } from '@/www/widgets/components';
import {
  useEventInfoMutation,
  useInvitationConfigMutation,
  useInvitationImageMutation,
  useWidgetMutation,
} from '@/www/widgets/mutations';
import type { ConfigPayload, EventInfoData, HookFormValues, WidgetData } from '@/www/widgets/types';
import { getImageSize } from '@/www/widgets/utils';
import type { ModalStore } from '@/www/widgets/zustand';
import useModalStore from '@/www/widgets/zustand';

import WidgetEventAt from '../components/WidgetEventAt';
import { useInvitation, useWidgetIndex } from '../hooks';

import { IntroSelectDateFormatKey, IntroSelectLayout } from '.';

interface IntroWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function IntroWidgetConfigure({ widgetItem }: IntroWidgetConfigureProps): React.ReactNode {
  const [isAddress, setIsAddress] = useState(false);
  const [introWidgetConfig, setIntroWidgetConfig] = useState<IntroWidgetConfig>(
    widgetItem.config as IntroWidgetConfig,
  );
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { watch, register } = useFormContext<HookFormValues>();
  const { setOnSubmit, closeModal } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
    })),
  );
  const widgetIndex = useWidgetIndex(widgetItem);
  const { invitation } = useInvitation();
  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');
  const { mutate: postWidget } = useWidgetMutation(invitation?.id ?? '');
  const { mutate: postEventInfo } = useEventInfoMutation(invitation?.id ?? '');
  const { mutateAsync: postInvitationImage } = useInvitationImageMutation(invitation?.id ?? '');

  const handleClickEventInformation = () => {
    setIntroWidgetConfig((prev) => ({ ...prev, showEventInformation: !prev.showEventInformation }));
  };

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0];
    if (inputFile) {
      setIsImageLoading(true);
      const { width, height } = await getImageSize(inputFile);
      const formData = new FormData();
      formData.append('file', inputFile);
      formData.append('width', width.toString());
      formData.append('height', height.toString());
      const response = await postInvitationImage(formData);
      setIntroWidgetConfig((prev) => ({ ...prev, coverImage: response }));
      setIsImageLoading(false);
    }
  };

  const handleClickDeleteImage = () => {
    setIntroWidgetConfig((prev) => ({ ...prev, coverImage: null }));
  };

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(() => {
    if (!invitation || widgetIndex === null || widgetIndex === -1) return;

    const config: IntroWidgetConfig = {
      align: 'LEFT',
      coverImage: introWidgetConfig.coverImage,
      customTextColor: '',
      subTitle: String(watch(`invitation.widgets.${widgetIndex}.config.subTitle`)),
      dateFormatKey: watch(
        `invitation.widgets.${widgetIndex}.config.dateFormatKey`,
      ) as IntroDateFormatKey,
      layoutKey: watch(`invitation.widgets.${widgetIndex}.config.layoutKey`) as IntroLayoutKey,
      showEventInformation: watch(`invitation.widgets.${widgetIndex}.config.showEventInformation`),
      title: watch(`invitation.widgets.${widgetIndex}.config.title`) ?? '',
    };

    const eventInfoData: EventInfoData = {
      id: invitation.id,
      eventInfo: {
        eventAt: watch('invitation.eventAt'),
        location: {
          address: watch(`invitation.location.address`),
          coord: watch(`invitation.location.coord`),
          placeDetail: watch(`invitation.location.placeDetail`),
          placeName: watch(`invitation.location.placeName`),
          mapType: watch(`invitation.location.mapType`),
          placeId: watch(`invitation.location.placeId`),
          roadAddress: watch(`invitation.location.roadAddress`),
        },
      },
    };
    postEventInfo(eventInfoData);

    console.log('eventInfoData ====>', eventInfoData);

    if (!('id' in widgetItem)) {
      const widgetData: WidgetData = {
        id: invitation.id,
        widget: {
          index: 0,
          type: 'INTRO',
          config,
        },
      };
      postWidget(widgetData);
      closeModal();
      return;
    }

    const configPayloadData: ConfigPayload = {
      id: widgetItem.id,
      type: 'INTRO',
      index: invitation.widgets.findIndex((item) => item.id === widgetItem.id),
      config,
      stickers: [],
    };
    console.log('configPayloadData ====>', configPayloadData);
    putInvitationConfig(configPayloadData);
    closeModal();
  }, [
    widgetItem,
    watch,
    closeModal,
    putInvitationConfig,
    invitation,
    postWidget,
    postEventInfo,
    widgetIndex,
    introWidgetConfig,
  ]);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  if (widgetIndex === null) return <FixedLoader />;

  return (
    <div className="space-y-8">
      <IntroSelectLayout
        selectedLayout={introWidgetConfig.layoutKey}
        setSelectedLayout={setIntroWidgetConfig}
        register={register}
        widgetIndex={widgetIndex}
      />

      {/** 대표 이미지 */}
      {introWidgetConfig.layoutKey !== 'ONLY_TEXT' ? (
        <div className="space-y-2">
          <div>
            <Label label="대표 이미지" />
          </div>
          <div>
            <div
              className={cn(
                'center-flex relative h-[4.5rem] overflow-hidden rounded-lg border border-dashed border-slate-300',
                introWidgetConfig.coverImage ? 'bg-white' : 'px-4',
              )}
            >
              {isImageLoading ? <Loader /> : null}
              {introWidgetConfig.coverImage ? (
                <div className="center-flex relative flex-1 gap-4">
                  <div className="relative h-[4.5rem] w-[4.5rem] flex-none bg-slate-200 object-contain">
                    <Image
                      src={introWidgetConfig.coverImage.url}
                      alt="uploaded"
                      className="relative h-[4.5rem] w-[4.5rem] flex-none bg-white object-contain"
                      width={introWidgetConfig.coverImage.dimensions.width}
                      height={introWidgetConfig.coverImage.dimensions.height}
                    />
                  </div>
                  <div className="w-0 flex-1 text-sm">
                    <div className="truncate font-bold text-slate-500">이미지 등록됨</div>
                    <div className="truncate text-slate-400 empty:hidden">
                      {introWidgetConfig.coverImage.id}
                    </div>
                  </div>
                  <div className="center-flex gap-6 pr-4">
                    <Button
                      type="button"
                      variants="text_secondary"
                      size="medium"
                      className="h-12 rounded-md px-0 text-sm  text-indigo-600 hover:text-indigo-700 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
                    >
                      편집
                    </Button>
                    <Button
                      type="button"
                      variants="text_secondary"
                      size="medium"
                      className="h-12 rounded-md px-0 text-sm  text-slate-500 hover:text-slate-600 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
                      onClick={handleClickDeleteImage}
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              ) : null}
              {!introWidgetConfig.coverImage && !isImageLoading ? (
                <>
                  <Label
                    label="이미지 업로드"
                    addOn="png, jpg / 최대 10mb"
                    className="flex-1 text-sm flex-col items-start"
                    addOnClassName="text-slate-400"
                  />
                  <LuPlusCircle className="ml-auto flex-none stroke-1 text-2xl" />
                  <input
                    className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 file:cursor-pointer"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleChangeFile}
                  />
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="[--theme-black:15,23,42] [--theme-inter:51,65,85] [--theme-colored:100,116,139] [--theme-block:0,0,0] font-noto text-[14px] leading-loose text-theme-black/60">
          <div>
            {invitation ? <Intro config={introWidgetConfig} invitation={invitation} /> : null}
          </div>
        </div>
      </div>

      <WidgetBreakLine />

      {/** 타이틀 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub label="타이틀" subLabel="보통 신랑과 신부 이름을 많이 씁니다." />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            defaultValue={`신랑 ${invitation?.owners[0].name}, 신부 ${invitation?.owners[1].name}`}
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.title`}
            isTextarea
          >
            <div className="flex items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      {/** 꾸미기 문구 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub label="꾸미기 문구" subLabel="제목과 함께 사용되는 작은 문구입니다." />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            defaultValue={(widgetItem.config as IntroWidgetConfig).subTitle}
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.subTitle`}
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
          >
            <div className="flex flex-none items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      <WidgetBreakLine />

      {/** 예식 정보 표기 */}
      <div className="space-y-2 ">
        <div>
          <Label
            label="예식 정보 표기"
            addOn={
              <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
                <input
                  className="no-interaction peer absolute flex-none opacity-0"
                  type="checkbox"
                  checked={introWidgetConfig.showEventInformation}
                  onClick={handleClickEventInformation}
                  {...register(`invitation.widgets.${widgetIndex}.config.showEventInformation`)}
                />
                <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
              </label>
            }
          />
          <div className="text-sm text-slate-400">인트로에 예식 장소와 일시를 보여줍니다.</div>
        </div>
      </div>

      {introWidgetConfig.showEventInformation ? (
        <>
          <WidgetAddress isAddress={isAddress} setIsAddress={setIsAddress} />

          {!isAddress ? (
            <>
              {/** 예식장 이름 */}
              <div className="space-y-2 ">
                <div>
                  <Label label="예식장 이름" />
                </div>
                <div>
                  <WidgetLabelWithInput
                    labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 "
                    inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
                    defaultValue={watch('invitation.location.placeName')}
                    register={register}
                    registerOption="invitation.location.placeName"
                  >
                    <div className="flex flex-none items-center" />
                  </WidgetLabelWithInput>
                </div>
              </div>

              {/** 홀이름 */}
              <div className="space-y-2 ">
                <div>
                  <Label label="홀 이름" />
                </div>
                <div>
                  <WidgetLabelWithInput
                    labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 "
                    inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
                    defaultValue={watch('invitation.location.placeDetail')}
                    register={register}
                    registerOption="invitation.location.placeDetail"
                  >
                    <div className="flex flex-none items-center" />
                  </WidgetLabelWithInput>
                </div>
              </div>
            </>
          ) : null}

          {/** 예식 일시 */}
          <div className="space-y-2 ">
            <WidgetEventAt />
          </div>

          {/** 표기법 */}
          <IntroSelectDateFormatKey
            register={register}
            time={invitation?.eventAt ?? null}
            watch={watch}
            widgetIndex={widgetIndex}
          />
        </>
      ) : null}
    </div>
  );
}

export default IntroWidgetConfigure;
