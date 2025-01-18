'use client';

// 여기서는 절대경로(@) 임포트하면 스토리북 실행 안됨
import type { IInvitation, WidgetItem } from '@repo/shared';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

import { CalendarWidgetConfigure } from '../calendar';
import { CongratulationWidgetConfigure } from '../congratulation';
import { GalleryWidgetConfigure } from '../gallery';
import { GreetingWidgetConfigure } from '../greeting';
import { IntroWidgetConfigure } from '../intro';
import { LocationWidgetConfigure } from '../location';
import { MessageWidgetConfigure } from '../message';
import { RsvpWidgetConfigure } from '../rsvp';
import type { HookFormValues } from '../types';
import { VideoWidgetConfigure } from '../video';

interface WidgetModalProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'> | null;
}

type WidgetItemWithIndex = WidgetItem & { index?: number };

function WidgetModal({ widgetItem }: WidgetModalProps) {
  const changingInvitation = useWatch<HookFormValues>({
    name: 'invitation',
  });

  const changingWidgetItem = useMemo(() => {
    if (!widgetItem) return null;
    const widgetIndex = (widgetItem as WidgetItemWithIndex).index;
    if (!widgetIndex) return widgetItem;
    return (changingInvitation as IInvitation).widgets[widgetIndex] ?? widgetItem;
  }, [widgetItem, changingInvitation]);

  // 아래 div 수정 요망
  if (!changingWidgetItem) return <div />;
  if (changingWidgetItem.type === 'INTRO')
    return <IntroWidgetConfigure widgetItem={changingWidgetItem} />;
  if (changingWidgetItem.type === 'VIDEO')
    return <VideoWidgetConfigure widgetItem={changingWidgetItem} />;
  if (changingWidgetItem.type === 'CALENDAR')
    return <CalendarWidgetConfigure widgetItem={changingWidgetItem} />;
  if (changingWidgetItem.type === 'LOCATION')
    return <LocationWidgetConfigure widgetItem={changingWidgetItem} />;
  if (changingWidgetItem.type === 'GALLERY')
    return <GalleryWidgetConfigure widgetItem={changingWidgetItem} />;
  if (changingWidgetItem.type === 'RSVP')
    return <RsvpWidgetConfigure widgetItem={changingWidgetItem} />;
  if (changingWidgetItem.type === 'GREETING')
    return <GreetingWidgetConfigure widgetItem={changingWidgetItem} />;
  if (changingWidgetItem.type === 'CONGRATULATION')
    return <CongratulationWidgetConfigure widgetItem={changingWidgetItem} />;
  if (changingWidgetItem.type === 'MESSAGE')
    return <MessageWidgetConfigure widgetItem={changingWidgetItem} />;
}

// const WidgetModal = memo(UnmemoizedWidgetModal);
export default WidgetModal;
