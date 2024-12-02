'use client';

import type { GalleryWidgetConfig, WidgetItem } from '@repo/shared';
import type { UseFormRegister } from 'react-hook-form';

import { WidgetLabelWithInput } from '../components';
import { useWidgetIndex } from '../hooks';
import type { HookFormValues } from '../types';
import GalleryKeyItem from './GalleryKeyItem';

const GalleryLayoutKeys = ['CAROUSEL', 'TILING', 'SINGLE'] as const;

interface GalleryLayoutProps {
  register: UseFormRegister<HookFormValues>;
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function GalleryLayout({ register, widgetItem }: GalleryLayoutProps) {
  const widgetIndex = useWidgetIndex(widgetItem);
  return (
    <ul className="flex items-stretch gap-4">
      {GalleryLayoutKeys.map((key) => (
        <li className="w-0 flex-1" key={key}>
          <WidgetLabelWithInput
            key={`${key}input`}
            labelClassName="group relative h-full w-full cursor-pointer text-sm leading-relaxed"
            inputClassName="peer hidden"
            inputType="radio"
            inputValue={key}
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.layoutKey`}
            inputDefaultChecked={(widgetItem.config as GalleryWidgetConfig).layoutKey === key}
          >
            <GalleryKeyItem type={key} />
          </WidgetLabelWithInput>
        </li>
      ))}
    </ul>
  );
}

export default GalleryLayout;
