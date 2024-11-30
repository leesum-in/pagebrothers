'use client';

import { LabelWithSub } from '@repo/shared';
import type {
  GalleryLayoutCarouselAlignKey,
  GalleryLayoutKey,
  GalleryWidgetConfig,
  IInvitationImageData,
  WidgetItem,
} from '@repo/shared/src/types/pageBrothers.type';
import { useCallback, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { LuPlusCircle } from 'react-icons/lu';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetBreakLine, WidgetLabelWithInput } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useWidgetIndex } from '../hooks';
import { useInvitationConfigMutation, useInvitationImageMutation } from '../mutations';
import type { ConfigPayload, HookFormValues } from '../types';
import { getImageSize } from '../utils';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';
import GalleryCarouselAlign from './GalleryCarouselAlign';
import GalleryDraggableList from './GalleryDraggableList';
import GalleryDroppableUl from './GalleryDroppableUl';
import GalleryLayout from './GalleryLayout';

interface GalleryWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

export type IInvitationImageDataWithIsLoading = IInvitationImageData & {
  isLoading?: boolean;
};

function GalleryWidgetConfigure({ widgetItem }: GalleryWidgetConfigureProps) {
  const [fileUrls, setFileUrls] = useState<IInvitationImageDataWithIsLoading[]>(
    (widgetItem.config as GalleryWidgetConfig).items,
  );
  const [alignSlider, setAlignSlider] = useState<boolean>(
    (widgetItem.config as GalleryWidgetConfig).layoutKey === 'CAROUSEL',
  );

  const { watch, register } = useFormContext<HookFormValues>();

  const { setOnSubmit, closeModal, invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
      invitation: state.invitation,
      openMultiModal: state.openMultiModal,
    })),
  );
  const widgetIndex = useWidgetIndex(widgetItem);

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');
  const { mutateAsync: postInvitationImage } = useInvitationImageMutation(invitation?.id ?? '');

  const layoutKey = watch(`invitation.widgets.${widgetIndex ?? 0}.config.layoutKey`);

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFile = e.target.files?.[0];
    if (inputFile) {
      setFileUrls((prev) => [
        ...prev,
        { id: '', url: '', dimensions: { width: 0, height: 0 }, isLoading: true },
      ]);
      const { width, height } = await getImageSize(inputFile);
      const formData = new FormData();
      formData.append('file', inputFile);
      formData.append('width', width.toString());
      formData.append('height', height.toString());
      const response = await postInvitationImage(formData);

      setFileUrls((prev) => {
        const newFileUrls = [...prev];
        newFileUrls[newFileUrls.length - 1] = { ...response, isLoading: false };
        return newFileUrls;
      });
    }
  };

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(() => {
    if (!invitation || widgetIndex === null || widgetIndex === -1 || !('id' in widgetItem)) return;

    const config: GalleryWidgetConfig = {
      title: watch(`invitation.widgets.${widgetIndex}.config.title`) ?? '',
      align: watch(`invitation.widgets.${widgetIndex}.config.align`),
      items: fileUrls.map((item) => ({
        id: item.id,
        url: item.url,
        dimensions: item.dimensions,
      })),
      singleItem: null,
      layoutKey: watch(`invitation.widgets.${widgetIndex}.config.layoutKey`) as GalleryLayoutKey,
      layoutCarouselAlignKey: watch(
        `invitation.widgets.${widgetIndex}.config.layoutCarouselAlignKey`,
      ) as GalleryLayoutCarouselAlignKey,
    };

    const configPayloadData: ConfigPayload = {
      id: widgetItem.id,
      type: 'GALLERY',
      index: widgetIndex,
      config,
      stickers: [],
    };

    console.log('configPayloadData ====>', configPayloadData);
    putInvitationConfig(configPayloadData);
    closeModal();
  }, [fileUrls, invitation, widgetIndex, watch, putInvitationConfig, closeModal, widgetItem]);

  useEffect(() => {
    const isCarousel = layoutKey === 'CAROUSEL';
    setAlignSlider(isCarousel);
  }, [layoutKey]);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  if (widgetIndex === null) return <FixedLoader />;

  return (
    <div className="space-y-8">
      {/** 타이틀 정렬 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector label="타이틀 정렬" widgetItem={widgetItem} />
      </div>

      {/** 타이틀 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub label="타이틀" subLabel="타이틀을 추가하면 레이아웃이 조금 조정돼요." />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            defaultValue={(widgetItem.config as GalleryWidgetConfig).title}
            register={register}
            placeholder="타이틀 입력"
            registerOption={`invitation.widgets.${widgetIndex}.config.title`}
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
          >
            <div className="flex flex-none items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      {/** 레이아웃 */}
      <div className="space-y-2">
        <GalleryLayout register={register} widgetItem={widgetItem} />
      </div>

      <WidgetBreakLine />

      {/** 슬라이더 정렬 */}
      {alignSlider ? (
        <div className="space-y-2">
          <GalleryCarouselAlign widgetItem={widgetItem} register={register} />
        </div>
      ) : null}

      {/** 사진 업로드 */}
      <div className="space-y-2">
        <div>
          <LabelWithSub
            label="사진 업로드"
            subLabel="사진을 끌어서 순서를 바꿀 수 있어요"
            addOn="개수 제한 없음"
            addOnClassName="text-sm text-slate-400"
          />
        </div>
        <div>
          <GalleryDroppableUl<IInvitationImageDataWithIsLoading>
            items={fileUrls}
            setItems={setFileUrls}
          >
            {fileUrls.map((fileUrl, index) => (
              <GalleryDraggableList
                key={fileUrl.id}
                fileUrl={fileUrl}
                index={index}
                widgetIndex={widgetIndex}
                register={register}
              />
            ))}

            <li className="center-flex relative flex aspect-square overflow-hidden rounded-lg border border-dashed border-slate-300">
              <input
                className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0 file:cursor-pointer"
                type="file"
                accept="image/png, image/jpeg"
                multiple
                onChange={handleChangeFile}
              />
              <LuPlusCircle className="text-2xl text-slate-600" />
            </li>
          </GalleryDroppableUl>
        </div>
      </div>
    </div>
  );
}

export default GalleryWidgetConfigure;
