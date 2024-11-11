import type {
  CalendarWidgetConfig,
  CongratulationWidgetConfig,
  DdayWidgetConfig,
  EventSequenceWidgetConfig,
  GalleryWidgetConfig,
  GreetingWidgetConfig,
  GuestbookWidgetConfig,
  IInvitation,
  IInvitationLocation,
  IInvitationTemplate,
  IntroWidgetConfig,
  LocationWidgetConfig,
  MessageWidgetConfig,
  QnaWidgetConfig,
  RsvpWidgetConfig,
  VideoWidgetConfig,
  WidgetItem,
  WidgetType,
} from '@repo/shared/src/types/pageBrothers.type';

export type IdResponse = {
  id: string;
};

export interface ItemsResponse {
  items: IInvitation[] | IInvitationTemplate[];
}

export interface ISticker {
  id: string;
  imageId: string;
  data: {
    top: number;
    left: number;
    width: number;
    opacity: number;
  };
  widgetId: string;
}
export type WidgetConfigs =
  | CongratulationWidgetConfig
  | LocationWidgetConfig
  | EventSequenceWidgetConfig
  | GalleryWidgetConfig
  | GreetingWidgetConfig
  | IntroWidgetConfig
  | MessageWidgetConfig
  | QnaWidgetConfig
  | VideoWidgetConfig
  | CalendarWidgetConfig
  | GuestbookWidgetConfig
  | RsvpWidgetConfig
  | DdayWidgetConfig;

export type ConfigPayload = {
  index: number;
  stickers: ISticker[];
} & WidgetItem;

export type EventInfoPayload = {
  eventAt: string;
  location: IInvitationLocation;
};

export type WidgetPayload = {
  index: number;
  type: WidgetType;
  id?: string;
  config: WidgetConfigs;
};

export type WidgetData = {
  id: string;
  widget: WidgetPayload;
};

export type EventInfoData = {
  id: string;
  eventInfo: EventInfoPayload;
};

export type KaKaoResponseMeta = {
  is_end: boolean;
  pageable_count: number;
  same_name?: {
    keyword: string;
    region: [];
    selected_region: string;
  };
  total_count: number;
};

export type KaKaoKeywordDocument = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

export type KaKaoAddressDocument = {
  address: {
    address_name: string;
    b_code: string;
    h_code: string;
    main_address_no: string;
    mountain_yn: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_h_name: string;
    region_3depth_name: string;
    sub_address_no: string;
    x: string;
    y: string;
  };
  address_type: string;
  road_address: null;
  x: string;
  y: string;
};

export type KakaoAddressResponse = {
  documents: KaKaoAddressDocument[];
  meta: KaKaoResponseMeta;
};

export type KakaoKeywordResponse = {
  documents: KaKaoKeywordDocument[];
  meta: KaKaoResponseMeta;
};

export type IntroSearchEngine = 'KAKAO' | 'GOOGLE';

export type IntroSearchQuery = {
  value: string;
  engine: IntroSearchEngine;
};

export type HookFormValues = { invitation: IInvitation | null };
