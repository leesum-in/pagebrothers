/* eslint-disable react/no-array-index-key -- 리스트 아이템 키 충돌 방지 */
'use client';

import type {
  LocationTrafficDescriptionItems,
  LocationWidgetConfig,
  WidgetItem,
} from '@repo/shared';
import { Button, Label, LabelWithSub } from '@repo/shared';
import { useCallback, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetAddress, WidgetBreakLine, WidgetLabelWithInput } from '../components';
import { useWidgetIndex } from '../hooks';
import { useEventInfoMutation, useInvitationConfigMutation } from '../mutations';
import type { ConfigPayload, EventInfoData, HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';

const addressFormat = [
  {
    key: 'ROAD',
    label: '도로명 주소',
  },
  {
    key: 'LOT_NUMBER',
    label: '지번 주소',
  },
];

interface LocationWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function LocationWidgetConfigure({ widgetItem }: LocationWidgetConfigureProps) {
  const { watch, register, setValue } = useFormContext<HookFormValues>();
  const { setOnSubmit, closeModal, invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
      invitation: state.invitation,
      openMultiModal: state.openMultiModal,
    })),
  );
  const [isAddress, setIsAddress] = useState(false);
  const [trafficDescriptionItems, setTrafficDescriptionItems] = useState<
    LocationTrafficDescriptionItems[]
  >([]);

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');
  const { mutate: postEventInfo } = useEventInfoMutation(invitation?.id ?? '');

  const widgetIndex = useWidgetIndex(widgetItem);
  const widgetConfig = widgetItem.config as LocationWidgetConfig;

  const handleAddTrafficDescription = () => {
    setTrafficDescriptionItems((prev) => [...prev, { title: '', description: '' }]);
  };

  const handleChangeTrafficDescription =
    (index: number, type: 'title' | 'description') =>
    (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
      setTrafficDescriptionItems((prev) => {
        const newItems = [...prev];
        newItems[index][type] = e.target.value;
        return newItems;
      });
    };

  const handleClickTrashCan = (index: number) => () => {
    setTrafficDescriptionItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClickShowMap = () => {
    if (widgetIndex === null) return;
    setValue(
      `invitation.widgets.${widgetIndex}.config.exposeMap`,
      !watch(`invitation.widgets.${widgetIndex}.config.exposeMap`),
    );
  };

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(() => {
    if (!invitation || !('id' in widgetItem) || widgetIndex === null || widgetIndex === -1) return;

    const config: LocationWidgetConfig = {
      title: watch(`invitation.widgets.${widgetIndex}.config.title`),
      exposeMap: watch(`invitation.widgets.${widgetIndex}.config.exposeMap`),
      addressFormatKey: watch(`invitation.widgets.${widgetIndex}.config.addressFormatKey`),
      trafficDescriptionItems,
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
    console.log('eventInfoData ====>', eventInfoData);
    postEventInfo(eventInfoData);

    const configPayloadData: ConfigPayload = {
      id: widgetItem.id,
      type: 'LOCATION',
      index: widgetIndex,
      config,
      stickers: [],
    };
    console.log('configPayloadData ====>', configPayloadData);
    putInvitationConfig(configPayloadData);
    closeModal();
  }, [
    trafficDescriptionItems,
    invitation,
    widgetIndex,
    watch,
    putInvitationConfig,
    postEventInfo,
    widgetItem,
    closeModal,
  ]);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  if (widgetIndex === null) return <FixedLoader />;

  return (
    <div className="space-y-8">
      {/** 타이틀 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub label="타이틀" addOn="(선택)" addOnClassName="text-slate-400" />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            defaultValue={widgetConfig.title}
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.title`}
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
          >
            <div className="flex items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      {/** 예식장 주소 */}
      <WidgetAddress isAddress={isAddress} setIsAddress={setIsAddress} />

      {/** 표기법 */}
      <div className="space-y-2">
        <div>
          <LabelWithSub label="표기 주소" />
        </div>
        <div>
          <ul className="space-y-2">
            {addressFormat.map((item) => (
              <li key={item.key}>
                <WidgetLabelWithInput
                  labelClassName="relative cursor-pointer"
                  inputType="radio"
                  inputValue={item.key}
                  inputChecked={
                    widgetIndex
                      ? watch(`invitation.widgets.${widgetIndex}.config.addressFormatKey`) ===
                        item.key
                      : false
                  }
                  register={register}
                  registerOption={`invitation.widgets.${widgetIndex}.config.addressFormatKey`}
                  inputClassName="peer hidden"
                >
                  <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                    <p className="text-slate-600">
                      <span className="font-bold">{item.label}</span>
                      <span>{watch(`invitation.location.roadAddress`)}</span>
                    </p>
                  </div>
                </WidgetLabelWithInput>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/** 예식장 이름 */}
      <div className="space-y-2">
        <div>
          <LabelWithSub label="예식장 이름" />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            defaultValue={watch(`invitation.location.placeName`)}
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.placeName`}
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
          >
            <div className="flex items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      {/** 홀 이름 */}
      <div className="space-y-2">
        <div>
          <LabelWithSub label="홀 이름" />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            defaultValue={watch(`invitation.location.placeDetail`)}
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.placeDetail`}
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
          >
            <div className="flex items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      <WidgetBreakLine />

      {/** 지도 노출 여부 */}
      <div className="space-y-2 ">
        <div>
          <Label
            label="지도 노출 여부"
            addOn={
              <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
                <input
                  className="no-interaction peer absolute flex-none opacity-0"
                  type="checkbox"
                  checked={watch(`invitation.widgets.${widgetIndex}.config.exposeMap`)}
                  onClick={handleClickShowMap}
                  {...register(`invitation.widgets.${widgetIndex}.config.exposeMap`)}
                />
                <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
              </label>
            }
          />
          <div className="text-sm text-slate-400">인트로에 예식 장소와 일시를 보여줍니다.</div>
        </div>
      </div>

      {/** 길 안내 */}
      <div className="space-y-2">
        <div>
          <LabelWithSub label="길 안내" addOn="(선택)" addOnClassName="text-slate-400" />
        </div>
        <div>
          <ul className="space-y-2">
            {trafficDescriptionItems.map((item, index) => (
              <li key={`item-${index}`} className="relative">
                <WidgetLabelWithInput
                  labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 relative rounded-b-none focus-within:z-10"
                  placeholder="교통수단"
                  inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
                  inputValue={item.title}
                  onInputChange={handleChangeTrafficDescription(index, 'title')}
                >
                  <div className="flex flex-none items-center">
                    <Button
                      type="button"
                      variants="text_secondary"
                      size="medium"
                      className="absolute bottom-0 right-0 p-4 text-base text-red-500"
                    >
                      <FaRegTrashAlt onClick={handleClickTrashCan(index)} />
                    </Button>
                  </div>
                </WidgetLabelWithInput>
                <WidgetLabelWithInput
                  labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200 relative -mt-[1px] rounded-t-none"
                  textareaPlaceholder="설명"
                  isTextarea
                  inputValue={item.description}
                  onInputChange={handleChangeTrafficDescription(index, 'description')}
                />
              </li>
            ))}
            <li>
              <button
                type="button"
                className="w-full h-12 rounded-md px-4 text-sm border border-dashed border-slate-300 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
                onClick={handleAddTrafficDescription}
              >
                <span>길 안내 추가하기</span>
                <FiPlus className="text-xl" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LocationWidgetConfigure;
