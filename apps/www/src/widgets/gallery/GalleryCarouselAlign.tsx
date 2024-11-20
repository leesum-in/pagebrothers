'use client';

import type { GalleryWidgetConfig, WidgetItem } from '@repo/shared';
import type { UseFormRegister } from 'react-hook-form';

import { WidgetLabelWithInput } from '../components';
import { useWidgetIndex } from '../hooks';
import type { HookFormValues } from '../types';
import GalleryKeyItem from './GalleryKeyItem';

const GalleryCarouselAlignKeys = ['WIDTH', 'HEIGHT'] as const;

interface GalleryCarouselAlignProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
  register: UseFormRegister<HookFormValues>;
}

function GalleryCarouselAlign({ widgetItem, register }: GalleryCarouselAlignProps) {
  const widgetIndex = useWidgetIndex(widgetItem);

  return (
    <ul className="flex items-stretch gap-4">
      {GalleryCarouselAlignKeys.map((key) => (
        <li className="w-0 flex-1" key={key}>
          <WidgetLabelWithInput
            labelClassName="h-full cursor-pointer"
            inputClassName="peer hidden"
            inputType="radio"
            inputValue={key}
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.layoutCarouselAlignKey`}
            inputDefaultChecked={
              (widgetItem.config as GalleryWidgetConfig).layoutCarouselAlignKey === key
            }
          >
            <GalleryKeyItem type={key} />
          </WidgetLabelWithInput>
        </li>
      ))}
    </ul>
  );
}

export default GalleryCarouselAlign;
