import { WidgetWrapper } from '@/www/widgets/components';
import { Intro } from '@shared/components';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Widgets/Intro',
  component: Intro,
  decorators: [
    (Story) => (
      <WidgetWrapper>
        <Story />
      </WidgetWrapper>
    ),
  ],
  argTypes: {
    config: {
      subTitle: { control: 'text' },
      title: { control: 'text' },
      coverImage: { control: 'object' },
      layoutKey: { control: 'text' },
      align: { control: 'text' },
      customTextColor: { control: 'text' },
      showEventInformation: { control: 'boolean' },
      dateFormatKey: { control: 'text' },
    },
    invitation: {
      id: { control: 'text' },
      eventAt: { control: 'text' },
      location: { control: 'object' },
      design: { control: 'object' },
      widgets: { control: 'object' },
      images: { control: 'object' },
      owners: { control: 'object' },
      editingExpired: { control: 'boolean' },
      editors: { control: 'object' },
      share: { control: 'object' },
      meta: { control: 'object' },
    },
  },
} as Meta<typeof Intro>;

const Template: StoryFn<typeof Intro> = (args) => <Intro {...args} />;

export const Default = Template.bind({});
Default.args = {
  config: {
    align: 'CENTER',
    customTextColor: '#000000',
    showEventInformation: true,
    dateFormatKey: 'KO',
    subTitle: '서브 타이틀',
    title: '타이틀',
    coverImage: {
      id: '123',
      url: 'https://yy-static.pagesisters.cc/invitations/0192f4af-3602-04c4-9888-2bba5a4be126/0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
      dimensions: { width: 150, height: 150 },
    },
    layoutKey: 'IMAGE_ROUND_FRAME',
  },
  invitation: {
    id: '0192f4af-3602-04c4-9888-2bba5a4be126',
    eventAt: '2025-01-23T13:00:00',
    createdAt: '2024-11-04T09:59:36',
    updatedAt: '2024-11-04T10:19:04',
    location: {
      address: '서울 구로구 오류동 223-5',
      roadAddress: '서울 구로구 오리로 1189',
      placeName: '항동철길',
      placeDetail: '철길',
      coord: [126.83517832671964, 37.48885919620487],
      placeId: null,
      mapType: null,
    },
    design: {
      layoutType: 'WIDGETS',
      brandColor: 'slate',
      font: 'serif',
      textSize: 'md',
      zoomDisabled: 'none',
    },
    owners: [
      {
        id: '0192f4af-3602-04c4-9888-2bba5a4be128',
        role: 'GROOM',
        name: '오은',
      },
      {
        id: '0192f4af-3602-04c4-9888-2bba5a4be129',
        role: 'BRIDE',
        name: '은오',
      },
    ],
    widgets: [
      {
        id: '0192f4c1-06e7-febe-0b8a-5b21d7252f3f',
        type: 'INTRO',
        config: {
          align: 'LEFT',
          title: '신랑 오은333, 신부 은오222',
          subTitle: '222wedding day222',
          layoutKey: 'IMAGE_ROUND_FRAME',
          coverImage: {
            id: '0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
            url: 'https://yy-static.pagesisters.cc/invitations/0192f4af-3602-04c4-9888-2bba5a4be126/0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
            dimensions: {
              width: 1280,
              height: 832,
            },
          },
          dateFormatKey: 'KO',
          customTextColor: '',
          showEventInformation: true,
        },
      },
    ],
    images: {
      '0192f4bc-1bb2-adc5-5d49-37e64d58ab3c': {
        id: '0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
        url: 'https://yy-static.pagesisters.cc/invitations/0192f4af-3602-04c4-9888-2bba5a4be126/0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
        dimensions: {
          width: 1280,
          height: 832,
        },
        cropData: null,
      },
      '0192f4bc-913f-4d76-cea5-cbcf572e5b0c': {
        id: '0192f4bc-913f-4d76-cea5-cbcf572e5b0c',
        url: 'https://yy-static.pagesisters.cc/invitations/0192f4af-3602-04c4-9888-2bba5a4be126/0192f4bc-913f-4d76-cea5-cbcf572e5b0c',
        dimensions: {
          width: 640,
          height: 427,
        },
        cropData: null,
      },
    },
    editingExpired: false,
    editors: [
      {
        id: '0191fe77-ac66-cec3-31d5-f6858b1e730f',
        name: '오은',
        profileImage:
          'http://k.kakaocdn.net/dn/STNNp/btsjsfEcBeG/kRnXe5vmTL6HFHk4sBrny0/img_640x640.jpg',
      },
    ],
    share: null,
    meta: {
      thumbnailId: '0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
      title: '오은, 은오 결혼합니다',
      description: '11월 30일 13시 태평홀 서울시민청',
      kakaotalkThumbnailId: '0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
      kakaotalkTitle: '오은, 은오 결혼합니다',
      kakaotalkDescription: '11월 30일 13시 태평홀 서울시민청',
      kakaotalkUseLocationButton: true,
      isDefaultKakaotalkThumbnailId: true,
      isDefaultThumbnailId: true,
    },
  },
};
