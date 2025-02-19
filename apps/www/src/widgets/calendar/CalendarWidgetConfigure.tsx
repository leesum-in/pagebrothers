'use client';

import type { CalendarWidgetConfig, WidgetItem } from '@repo/shared';
import { Label, LabelWithSub } from '@repo/shared';
import { useCallback, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetBreakLine, WidgetLabelWithInput } from '../components';
import WidgetEventAt from '../components/WidgetEventAt';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useInvitation, useWidgetIndex } from '../hooks';
import { useEventInfoMutation, useInvitationConfigMutation } from '../mutations';
import type { ConfigPayload, EventInfoData, HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';

interface CalendarWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function CalendarWidgetConfigure({ widgetItem }: CalendarWidgetConfigureProps) {
  const [isIcalButtonChecked, setIsIcalButtonChecked] = useState(true);
  const { watch, register, reset } = useFormContext<HookFormValues>();
  const { setOnSubmit, closeModal } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
    })),
  );
  const { invitation } = useInvitation();
  const { mutate: postEventInfo } = useEventInfoMutation(invitation?.id ?? '');
  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');

  const widgetIndex = useWidgetIndex(widgetItem);

  const handleClickHasICalButton = () => {
    setIsIcalButtonChecked((prev) => !prev);
  };

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(() => {
    if (!invitation || widgetIndex === null || widgetIndex === -1 || !('id' in widgetItem)) return;

    const config: CalendarWidgetConfig = {
      align: watch(`invitation.widgets.${widgetIndex}.config.align`),
      title: String(watch(`invitation.widgets.${widgetIndex}.config.title`)),
      showTime: watch(`invitation.widgets.${widgetIndex}.config.showTime`),
      eventName: watch(`invitation.widgets.${widgetIndex}.config.eventName`),
      hasICalButton: isIcalButtonChecked,
      differenceFormat: watch(`invitation.widgets.${widgetIndex}.config.differenceFormat`),
    };

    const configPayloadData: ConfigPayload = {
      id: widgetItem.id,
      type: 'CALENDAR',
      index: invitation.widgets.findIndex((item) => item.id === widgetItem.id),
      config,
      stickers: [],
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
    putInvitationConfig(configPayloadData);

    console.log('configPayloadData ====>', configPayloadData);
    console.log('eventInfoData ====>', eventInfoData);
    closeModal();
  }, [
    closeModal,
    invitation,
    widgetItem,
    widgetIndex,
    isIcalButtonChecked,
    watch,
    postEventInfo,
    putInvitationConfig,
  ]);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit, reset]);

  if (widgetIndex === null) return <FixedLoader />;

  return (
    <div className="space-y-8">
      {/** 텍스트 정렬 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector label="텍스트 정렬" widgetItem={widgetItem} />
      </div>

      {/** 타이틀 */}
      <div className="space-y-2">
        <div>
          <Label label="타이틀" addOn="(선택)" />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
            defaultValue={watch(`invitation.widgets.${widgetIndex}.config.title`)}
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.title`}
          />
        </div>
      </div>

      <WidgetBreakLine />

      {/** 예식 일시 */}
      <div className="space-y-2">
        <WidgetEventAt />
      </div>

      {/** 예식 시간표시하기 */}
      <div className="space-y-2">
        <Label
          label="예식 시간 표시하기"
          addOn={
            <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
              <input
                className="no-interaction peer absolute flex-none opacity-0"
                type="checkbox"
                checked={watch(`invitation.widgets.${widgetIndex}.config.showTime`)}
                {...register(`invitation.widgets.${widgetIndex}.config.showTime`)}
              />
              <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
            </label>
          }
        />
        <div className="text-sm text-slate-400">예식일 아래에 시간을 표시합니다.</div>
      </div>

      {/** 남은 날짜 표기 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector
          label="남은 날짜 표기"
          widgetItem={widgetItem}
          texts={['안내 문구', '디데이(D-day)', '표시 안함']}
          value={['SENTENCE', 'DDAY', 'NONE']}
        />
      </div>

      {/** 내캘린더에추가하기 버튼 추가 */}
      <div className="space-y-2">
        <Label
          label="[내 캘린더에 저장하기] 버튼 추가"
          addOn={
            <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
              <input
                className="no-interaction peer absolute flex-none opacity-0"
                type="checkbox"
                checked={isIcalButtonChecked}
                onClick={handleClickHasICalButton}
                {...register(`invitation.widgets.${widgetIndex}.config.hasICalButton`)}
              />
              <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
            </label>
          }
        />
        <div className="text-sm text-slate-400">
          버튼을 누르면 캘린더에 일정이 자동으로 추가됩니다.
        </div>
      </div>

      {/** 이벤트 명 */}
      {isIcalButtonChecked ? (
        <div className="space-y-2">
          <div>
            <LabelWithSub
              label="이벤트명"
              subLabel="하객 캘린더에 아래의 이름으로 일정이 저장돼요."
            />
          </div>
          <div>
            <WidgetLabelWithInput
              labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
              inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
              defaultValue={watch(`invitation.widgets.${widgetIndex}.config.eventName`)}
              register={register}
              registerOption={`invitation.widgets.${widgetIndex}.config.eventName`}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CalendarWidgetConfigure;
