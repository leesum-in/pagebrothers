'use client';

import { CloseIcon, cn, LabelWithSub } from '@repo/shared';
import type {
  GalleryLayoutCarouselAlignKey,
  GalleryLayoutKey,
  GalleryWidgetConfig,
  IInvitationImageData,
  WidgetItem,
} from '@repo/shared/src/types/pageBrothers.type';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { LuPlusCircle } from 'react-icons/lu';
import { useShallow } from 'zustand/shallow';

import { FixedLoader, Loader } from '@/www/ui';

import { WidgetBreakLine, WidgetLabelWithInput } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useWidgetIndex } from '../hooks';
import { useInvitationConfigMutation, useInvitationImageMutation } from '../mutations';
import type { ConfigPayload, HookFormValues } from '../types';
import { getImageSize } from '../utils';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';
import GalleryCarouselAlign from './GalleryCarouselAlign';
import GalleryLayout from './GalleryLayout';

interface GalleryWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

type IInvitationImageDataWithIsLoading = IInvitationImageData & {
  isLoading?: boolean;
};

function GalleryWidgetConfigure({ widgetItem }: GalleryWidgetConfigureProps) {
  const [fileUrls, setFileUrls] = useState<IInvitationImageDataWithIsLoading[]>(
    (widgetItem.config as GalleryWidgetConfig).items,
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
      items: fileUrls,
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
      <div className="space-y-2">
        <GalleryCarouselAlign widgetItem={widgetItem} register={register} />
      </div>

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
          <ul className="grid grid-cols-3 gap-4">
            {fileUrls.map((fileUrl, index) => (
              <li
                key={fileUrl.id}
                className={cn(
                  'center-flex relative isolate flex aspect-square touch-none overflow-hidden rounded-lg',
                  fileUrl.isLoading && 'border',
                )}
                style={{ zIndex: 'auto' }}
              >
                {fileUrl.isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <input
                      type="hidden"
                      {...register(
                        `invitation.widgets.${widgetIndex}.config.items.${index}.id` as keyof HookFormValues,
                      )}
                      value={fileUrl.id}
                    />
                    <div className="relative h-full w-full object-cover">
                      {/** 아래 image 컴포넌트 dnd-kit 적용 */}
                      <Image
                        src={fileUrl.url}
                        alt="uploaded image"
                        className="relative h-full w-full bg-white object-cover"
                        role="button"
                        width={fileUrl.dimensions.width}
                        height={fileUrl.dimensions.height}
                        tabIndex={0}
                      />
                    </div>
                    <button
                      type="button"
                      className="center-flex absolute right-0 top-0 z-[2] flex h-8 w-8 touch-none text-red-500"
                    >
                      <CloseIcon className="text-red-500" />
                    </button>
                    <div className="center-flex absolute left-0 bottom-0 z-[2] w-full cursor-pointer">
                      <button className="pt-2 pb-2 align-bottom" type="button">
                        <span className="touch-none rounded-lg bg-white bg-opacity-80 py-1 px-2 text-xs font-bold text-slate-600">
                          이미지 편집
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </li>
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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GalleryWidgetConfigure;
