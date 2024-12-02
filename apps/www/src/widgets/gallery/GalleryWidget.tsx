'use client';

import { Gallery, type WidgetItem } from '@repo/shared';

import { WidgetWrapper } from '../components';
import useModalStore from '../zustand';

interface GalleryWidgetProps {
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
}

function GalleryWidget({ widgetItem, isMultiModal = false }: GalleryWidgetProps) {
  const { invitation } = useModalStore();

  if (!invitation) return null;

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <Gallery widgetItem={widgetItem} />
    </WidgetWrapper>
  );
}

export default GalleryWidget;
