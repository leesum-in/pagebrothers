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
} from '@/types/pageBrothers.type';

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
