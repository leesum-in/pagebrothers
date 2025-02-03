'use client';

// 여기서는 절대경로(@) 임포트하면 스토리북 실행 안됨
import type { WidgetItem } from '@repo/shared';
import { memo } from 'react';

import { CalendarWidgetConfigure } from '../calendar';
import { CongratulationWidgetConfigure } from '../congratulation';
import { EventSequenceWidgetConfigure } from '../event-sequence';
import { GalleryWidgetConfigure } from '../gallery';
import { GreetingWidgetConfigure } from '../greeting';
import { IntroWidgetConfigure } from '../intro';
import { LocationWidgetConfigure } from '../location';
import { MessageWidgetConfigure } from '../message';
import { RsvpWidgetConfigure } from '../rsvp';
import { VideoWidgetConfigure } from '../video';

interface WidgetModalProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'> | null;
}

function UnmemoizedWidgetConfigureDistributor({ widgetItem }: WidgetModalProps) {
  // 아래 div 수정 요망
  if (!widgetItem) return <div />;
  if (widgetItem.type === 'INTRO') return <IntroWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'VIDEO') return <VideoWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'CALENDAR') return <CalendarWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'LOCATION') return <LocationWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'GALLERY') return <GalleryWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'RSVP') return <RsvpWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'GREETING') return <GreetingWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'CONGRATULATION')
    return <CongratulationWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'MESSAGE') return <MessageWidgetConfigure widgetItem={widgetItem} />;
  if (widgetItem.type === 'EVENT_SEQUENCE')
    return <EventSequenceWidgetConfigure widgetItem={widgetItem} />;
}

const WidgetConfigureDistributor = memo(UnmemoizedWidgetConfigureDistributor);
export default WidgetConfigureDistributor;
