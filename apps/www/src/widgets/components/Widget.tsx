'use client';

import type { IInvitation, WidgetItem } from '@repo/shared/src/types/pageBrothers.type';
import dynamic from 'next/dynamic';
import { memo } from 'react';
import { useFieldArray, useWatch } from 'react-hook-form';

import { useWidgetIndex } from '../hooks';
import type { HookFormValues } from '../types';

interface WidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
  isMultiModal?: boolean;
}

const components: Record<
  string,
  React.ComponentType<{ invitation?: IInvitation; widgetItem: WidgetItem; isMultiModal?: boolean }>
> = {
  INTRO: dynamic(() => import('../intro/IntroWidget'), {
    ssr: false,
  }),
  VIDEO: dynamic(() => import('../video/VideoWidget'), {
    ssr: false,
  }),
  MESSAGE: dynamic(() => import('../message/MessageWidget'), {
    ssr: false,
  }),
  CALENDAR: dynamic(() => import('../calendar/CalendarWidget'), {
    ssr: false,
  }),
  LOCATION: dynamic(() => import('../location/LocationWidget'), {
    ssr: false,
  }),
  GALLERY: dynamic(() => import('../gallery/GalleryWidget'), {
    ssr: false,
  }),
  RSVP: dynamic(() => import('../rsvp/RsvpWidget'), {
    ssr: false,
  }),
  GREETING: dynamic(() => import('../greeting/GreetingWidget'), {
    ssr: false,
  }),
  CONGRATULATION: dynamic(() => import('../congratulation/CongratulationWidget'), {
    ssr: false,
  }),
};

function UnmemoizedWidget({ invitation, widgetItem, isMultiModal }: WidgetProps) {
  const WidgetComponent = components[widgetItem.type as keyof typeof components];
  const widgetIndex = useWidgetIndex(widgetItem)!;

  const { fields } = useFieldArray<HookFormValues, `invitation.widgets`>({
    name: `invitation.widgets` as const,
  });

  const changingInvitation = useWatch<HookFormValues>({
    name: 'invitation',
  });

  console.log('changingInvitation ====>', changingInvitation);

  return (
    <WidgetComponent
      invitation={changingInvitation ? (changingInvitation as IInvitation) : invitation}
      widgetItem={fields.filter((field) => field.index === widgetIndex)[0]}
      isMultiModal={isMultiModal}
    />
  );
}

const Widget = memo(UnmemoizedWidget);
export default Widget;
