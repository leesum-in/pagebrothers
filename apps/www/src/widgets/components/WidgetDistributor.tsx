'use client';

import type {
  CalendarWidgetItem,
  CongratulationWidgetItem,
  EventSequenceWidgetItem,
  GalleryWidgetItem,
  GreetingWidgetItem,
  IntroWidgetItem,
  LocationWidgetItem,
  MessageWidgetItem,
  QnaWidgetItem,
  RsvpWidgetItem,
  VideoWidgetItem,
  WidgetItem,
} from '@repo/shared/src/types/pageBrothers.type';

import { CalendarWidget } from '../calendar';
import { CongratulationWidget } from '../congratulation';
import { EventSequenceWidget } from '../event-sequence';
import { GalleryWidget } from '../gallery';
import { GreetingWidget } from '../greeting';
import { useWidgetIndex } from '../hooks';
import { IntroWidget } from '../intro';
import { LocationWidget } from '../location';
import { MessageWidget } from '../message';
import { QnAWidget } from '../qna';
import { RsvpWidget } from '../rsvp';
import { VideoWidget } from '../video';
import useModalStore from '../zustand';

interface WidgetProps {
  // invitation?: IInvitation;
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
  isMultiModal?: boolean;
}

function WidgetDistributor({ widgetItem, isMultiModal }: WidgetProps) {
  // 여기는 변화하는 값을 바로 받아서 반영해야 하기 때문에 아래 변화하는 위젯 아이템 로직을 추가
  const widgetIndex = useWidgetIndex(widgetItem)!;
  // 여기를 useWatch 대신에 zustand invitation 으로 변경?
  // const changingInvitation =
  //   useWatch<HookFormValues>({
  //     name: 'invitation',
  //   }) ?? invitation;

  const { invitation: changingInvitation } = useModalStore();

  if (!changingInvitation) return null;
  const changingWidgetItem = changingInvitation.widgets[widgetIndex] ?? widgetItem;

  if (widgetItem.type === 'INTRO')
    return (
      <IntroWidget
        widgetItem={changingWidgetItem as IntroWidgetItem}
        invitation={changingInvitation}
        isMultiModal={isMultiModal}
      />
    );
  if (widgetItem.type === 'VIDEO')
    return <VideoWidget widgetItem={widgetItem as VideoWidgetItem} isMultiModal={isMultiModal} />;
  if (widgetItem.type === 'CALENDAR')
    return (
      <CalendarWidget
        widgetItem={changingWidgetItem as CalendarWidgetItem}
        invitation={changingInvitation}
        isMultiModal={isMultiModal}
      />
    );
  if (widgetItem.type === 'LOCATION')
    return (
      <LocationWidget
        widgetItem={changingWidgetItem as LocationWidgetItem}
        invitation={changingInvitation}
        isMultiModal={isMultiModal}
      />
    );
  if (widgetItem.type === 'GALLERY')
    return (
      <GalleryWidget
        widgetItem={changingWidgetItem as GalleryWidgetItem}
        invitation={changingInvitation}
        isMultiModal={isMultiModal}
      />
    );
  if (widgetItem.type === 'RSVP')
    return (
      <RsvpWidget
        widgetItem={changingWidgetItem as RsvpWidgetItem}
        invitation={changingInvitation}
        isMultiModal={isMultiModal}
      />
    );
  if (widgetItem.type === 'GREETING')
    return (
      <GreetingWidget
        widgetItem={changingWidgetItem as GreetingWidgetItem}
        invitation={changingInvitation}
        isMultiModal={isMultiModal}
      />
    );
  if (widgetItem.type === 'CONGRATULATION')
    return (
      <CongratulationWidget
        widgetItem={changingWidgetItem as CongratulationWidgetItem}
        invitation={changingInvitation}
        isMultiModal={isMultiModal}
      />
    );
  if (widgetItem.type === 'MESSAGE')
    return (
      <MessageWidget
        widgetItem={changingWidgetItem as MessageWidgetItem}
        isMultiModal={isMultiModal}
      />
    );
  if (widgetItem.type === 'EVENT_SEQUENCE')
    return (
      <EventSequenceWidget
        widgetItem={changingWidgetItem as EventSequenceWidgetItem}
        invitation={changingInvitation}
        isMultiModal={isMultiModal}
      />
    );

  if (widgetItem.type === 'QNA')
    return (
      <QnAWidget
        widgetItem={changingWidgetItem as QnaWidgetItem}
        invitation={changingInvitation}
        isMultiModal={isMultiModal}
      />
    );
}

// const Widget = memo(UnmemoizedWidget);
export default WidgetDistributor;
