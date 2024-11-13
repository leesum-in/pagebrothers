import {
  IInvitationDesign,
  IntroWidgetItem,
  WidgetItem,
} from '@repo/shared/src/types/pageBrothers.type';
const invitation = {
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
    layoutType: 'WIDGETS' as IInvitationDesign['layoutType'],
    brandColor: 'slate' as IInvitationDesign['brandColor'],
    font: 'serif' as IInvitationDesign['font'],
    textSize: 'md' as IInvitationDesign['textSize'],
    zoomDisabled: 'none' as IInvitationDesign['zoomDisabled'],
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
      type: 'INTRO' as WidgetItem['type'],
      index: 0,
      config: {
        align: 'LEFT' as IntroWidgetItem['config']['align'],
        title: '신랑 오은333, 신부 은오222',
        subTitle: '222wedding day222',
        layoutKey: 'IMAGE_ROUND_FRAME' as IntroWidgetItem['config']['layoutKey'],
        coverImage: {
          id: '0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
          url: 'https://yy-static.pagesisters.cc/invitations/0192f4af-3602-04c4-9888-2bba5a4be126/0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
          dimensions: {
            width: 1280,
            height: 832,
          },
        },
        dateFormatKey: 'KO' as IntroWidgetItem['config']['dateFormatKey'],
        customTextColor: '' as IntroWidgetItem['config']['customTextColor'],
        showEventInformation: true as IntroWidgetItem['config']['showEventInformation'],
      },
      stickers: [],
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
  fullDaySchedule: false,
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
};

export default invitation;
