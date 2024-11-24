'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CloseIcon, cn } from '@repo/shared';
import Image from 'next/image';
import type { UseFormRegister } from 'react-hook-form';

import { Loader } from '@/www/ui';

import type { HookFormValues } from '../types';
import type { IInvitationImageDataWithIsLoading } from './GalleryWidgetConfigure';

interface GalleryDraggableListProps {
  fileUrl: IInvitationImageDataWithIsLoading;
  index: number;
  widgetIndex: number;
  register: UseFormRegister<HookFormValues>;
}

function GalleryDraggableList({
  fileUrl,
  index,
  widgetIndex,
  register,
}: GalleryDraggableListProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: fileUrl.id, // 고유 ID
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      key={fileUrl.id}
      className={cn(
        'center-flex relative isolate flex aspect-square touch-none overflow-hidden rounded-lg',
        fileUrl.isLoading && 'border',
      )}
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
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
  );
}

export default GalleryDraggableList;
