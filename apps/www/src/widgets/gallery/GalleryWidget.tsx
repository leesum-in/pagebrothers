'use client';

import type { GalleryWidgetItem, IInvitation, WidgetItem } from '@repo/shared';
import { Gallery } from '@repo/shared';

import { WidgetWrapper } from '../components';

interface GalleryWidgetProps {
  widgetItem: WidgetItem;
  invitation: IInvitation;
  isMultiModal?: boolean;
}

function GalleryWidget({ widgetItem, invitation, isMultiModal = false }: GalleryWidgetProps) {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <Gallery widgetItem={widgetItem as GalleryWidgetItem} invitation={invitation} />
    </WidgetWrapper>
  );
}

export default GalleryWidget;
