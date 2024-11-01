'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext, type SubmitHandler } from 'react-hook-form';
import { FaRegTrashAlt } from 'react-icons/fa';
import { LuPlusCircle } from 'react-icons/lu';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { useShallow } from 'zustand/shallow';

import type {
  IntroDateFormatKey,
  IntroLayoutKey,
  IntroWidgetConfig,
  WidgetItem,
} from '@/types/pageBrothers.type';

import { WidgetBreakLine } from '../components';
import { useEventInfoMutation, useInvitationConfigMutation, useWidgetMutation } from '../mutations';
import type { ConfigPayload, EventInfoData, HookFormValues, IntroSearchEngine } from '../types';
import { formatDate, getWidgetIndex } from '../utils';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';
import Intro from './Intro';
import IntroComboBox from './IntroComboBox';
import IntroSelectDateFormatKey from './IntroSelectDateFormatKey';
import IntroSelectLayout from './IntroSelectLayout';

interface IntroWidgetConfigureProps {
  widgetItem: WidgetItem;
}

function IntroWidgetConfigure({ widgetItem }: IntroWidgetConfigureProps): React.ReactNode {
  const [isAddress, setIsAddress] = useState(false);
  const [searchEngine, setSearchEngine] = useState<IntroSearchEngine>('KAKAO');
  const [selectedLayout, setSelectedLayout] = useState<IntroLayoutKey>(
    (widgetItem.config as IntroWidgetConfig).layoutKey,
  );
  const { watch, register } = useFormContext<HookFormValues>();
  const { setOnSubmit, closeModal, invitation, openMultiModal } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
      invitation: state.invitation,
      openMultiModal: state.openMultiModal,
    })),
  );

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');
  const { mutate: postWidget } = useWidgetMutation(invitation?.id ?? '');
  const { mutate: postEventInfo } = useEventInfoMutation(invitation?.id ?? '');

  const handleClickTrashCan = () => {
    setIsAddress(true);
  };

  const handleChangeEngine = () => {
    setSearchEngine((prev) => (prev === 'KAKAO' ? 'GOOGLE' : 'KAKAO'));
  };

  const handleClickCalendar = () => {
    openMultiModal({ widget: null, calendar: true });
  };

  const widgetIndex = useMemo(
    () => getWidgetIndex(invitation, widgetItem.type),
    [invitation, widgetItem.type],
  );

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(() => {
    if (!invitation || !widgetIndex) return;

    const config: IntroWidgetConfig = {
      align: 'LEFT',
      coverImage: null,
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
    // postEventInfo(eventInfoData);

    console.log('eventInfoData ====>', eventInfoData);

    // if (!widgetItem.id) {
    //   const widgetData: WidgetData = {
    //     id: invitation.id,
    //     widget: {
    //       index: 0,
    //       type: 'INTRO',
    //       config,
    //     },
    //   };
    //   postWidget(widgetData);
    //   closeModal();
    //   return;
    // }

    const configPayloadData: ConfigPayload = {
      id: widgetItem.id,
      type: 'INTRO',
      index: invitation.widgets.findIndex((item) => item.id === widgetItem.id),
      config,
      stickers: [],
    };
    console.log('configPayloadData ====>', configPayloadData);
    // putInvitationConfig(configPayloadData);
    // closeModal();
  }, [
    widgetItem,
    watch,
    closeModal,
    putInvitationConfig,
    invitation,
    postWidget,
    postEventInfo,
    widgetIndex,
  ]);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  if (!widgetIndex) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <IntroSelectLayout
        selectedLayout={selectedLayout}
        setSelectedLayout={setSelectedLayout}
        register={register}
        widgetIndex={widgetIndex}
      />

      {/** 대표 이미지 */}
      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">대표 이미지</div>
            <div className="text-sm" />
          </div>
        </div>
        <div>
          <div className="relative flex h-[4.5rem] items-center overflow-hidden rounded-lg border border-dashed border-slate-300 px-4">
            <div className="flex-1 text-sm">
              <div className="font-bold text-slate-500">이미지 업로드</div>
              <div className="text-slate-400 empty:hidden">png, jpg / 최대 10mb</div>
            </div>
            <LuPlusCircle className="ml-auto flex-none stroke-1 text-2xl" />
            <input
              className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 file:cursor-pointer"
              type="file"
              accept="image/png, image/jpeg"
              {...register(`invitation.widgets.${widgetIndex}.config.coverImage`)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="[--theme-black:15,23,42] [--theme-inter:51,65,85] [--theme-colored:100,116,139] [--theme-block:0,0,0] font-noto text-[14px] leading-loose text-theme-black/60">
          <div>
            {invitation ? (
              <Intro
                widgetItem={widgetItem}
                invitation={invitation}
                selectedLayout={selectedLayout}
              />
            ) : null}
          </div>
        </div>
      </div>

      <WidgetBreakLine />

      {/** 타이틀 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">타이틀</div>
            <div className="text-sm" />
          </div>
          <div className="text-sm text-slate-400">보통 신랑과 신부 이름을 많이 씁니다.</div>
        </div>
        <div>
          <label className="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200">
            <div className="flex items-center" />
            <textarea
              className="block w-full resize-none bg-white px-4 py-3 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300 undefined"
              spellCheck="false"
              autoComplete="off"
              defaultValue={`신랑 ${invitation?.owners[0].name}, 신부 ${invitation?.owners[1].name}`}
              // value={watchWidget('title')}
              rows={3}
              {...register(`invitation.widgets.${widgetIndex}.config.title`)}
            />
            <div className="flex items-center" />
          </label>
        </div>
      </div>

      {/** 꾸미기 문구 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">꾸미기 문구</div>
            <div className="text-sm" />
          </div>
          <div className="text-sm text-slate-400">제목과 함께 사용되는 작은 문구입니다.</div>
        </div>
        <div>
          <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 ">
            <div className="flex flex-none items-center" />
            <input
              className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
              spellCheck="false"
              autoComplete="off"
              defaultValue={(widgetItem.config as IntroWidgetConfig).subTitle}
              // value={watchWidget('subTitle')}
              {...register(`invitation.widgets.${widgetIndex}.config.subTitle`)}
            />
            <div className="flex flex-none items-center" />
          </label>
        </div>
      </div>

      <WidgetBreakLine />

      {/** 예식 정보 표기 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">예식 정보 표기</div>
            <div className="text-sm">
              <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
                <input
                  className="no-interaction peer absolute flex-none opacity-0"
                  type="checkbox"
                  {...register(`invitation.widgets.${widgetIndex}.config.showEventInformation`)}
                />
                <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
              </label>
            </div>
          </div>
          <div className="text-sm text-slate-400">인트로에 예식 장소와 일시를 보여줍니다.</div>
        </div>
      </div>

      {/** 예식장 주소 */}
      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">예식장 주소</div>
            <div className="text-sm" />
          </div>
        </div>
        {isAddress ? (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 text-sm h-12 ">
                <label className="group relative flex-1 cursor-pointer text-center h-10">
                  <input
                    type="radio"
                    className="peer absolute cursor-pointer opacity-0"
                    value="KAKAO"
                    onChange={handleChangeEngine}
                    checked={searchEngine === 'KAKAO'}
                  />
                  <span className="center-flex h-full w-full rounded-md text-slate-500 peer-checked:border peer-checked:border-slate-200 peer-checked:bg-white peer-checked:font-bold peer-checked:text-slate-600">
                    국내
                  </span>
                </label>
                <label className="group relative flex-1 cursor-pointer text-center h-10">
                  <input
                    type="radio"
                    className="peer absolute cursor-pointer opacity-0"
                    value="GOOGLE"
                    onChange={handleChangeEngine}
                    checked={searchEngine === 'GOOGLE'}
                  />
                  <span className="center-flex h-full w-full rounded-md text-slate-500 peer-checked:border peer-checked:border-slate-200 peer-checked:bg-white peer-checked:font-bold peer-checked:text-slate-600">
                    해외
                  </span>
                </label>
              </div>
              <IntroComboBox engine={searchEngine} />
            </div>
          </APIProvider>
        ) : (
          <div>
            <div className="relative flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-100 text-left">
              <div className="w-0 flex-1 px-4">
                <p className="truncate text-slate-600">서울 중구 세종대로 110</p>
                <p className="truncate text-sm text-slate-400">서울특별시 중구 태평로1가 31</p>
              </div>
              <button
                className="center-flex h-16 w-16 flex-none text-slate-500"
                type="button"
                tabIndex={-1}
              >
                <FaRegTrashAlt onClick={handleClickTrashCan} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/** 예식장 이름 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">예식장 이름</div>
            <div className="text-sm" />
          </div>
        </div>
        <div>
          <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 ">
            <div className="flex flex-none items-center" />
            <input
              className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
              spellCheck="false"
              autoComplete="off"
              defaultValue={invitation?.location.placeName}
              // value={watchEventInfo('location.placeName')}
              {...register('invitation.location.placeName')}
            />
            <div className="flex flex-none items-center" />
          </label>
        </div>
      </div>

      {/** 홀이름 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">홀 이름</div>
            <div className="text-sm" />
          </div>
        </div>
        <div>
          <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 ">
            <div className="flex flex-none items-center" />
            <input
              className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
              spellCheck="false"
              autoComplete="off"
              defaultValue={invitation?.location.placeDetail}
              // value={watchEventInfo('location.placeDetail')}
              {...register('invitation.location.placeDetail')}
            />
            <div className="flex flex-none items-center" />
          </label>
        </div>
      </div>

      {/** 예식 일시 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">예식 일시</div>
            <div className="text-sm" />
          </div>
        </div>
        <div onClick={handleClickCalendar}>
          <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 ">
            <div className="flex flex-none items-center" />
            <input
              className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
              spellCheck="false"
              autoComplete="off"
              {...register('invitation.eventAt')}
              placeholder="예식일을 선택해주세요."
              readOnly
              defaultValue={formatDate(invitation?.eventAt ?? null, 'KO')}
              // value={watchEventInfo('eventAt')}
            />
            <div className="flex flex-none items-center">
              <div className="center-flex h-12 w-12 text-slate-400">
                <MdOutlineCalendarToday />
              </div>
            </div>
          </label>
        </div>
      </div>

      {/** 표기법 */}
      <IntroSelectDateFormatKey
        register={register}
        time={invitation?.eventAt ?? null}
        watch={watch}
        widgetIndex={widgetIndex}
      />
    </div>
  );
}

export default IntroWidgetConfigure;
