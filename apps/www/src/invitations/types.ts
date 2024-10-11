import type { IInvitation, IInvitationTemplate, WidgetItem } from '@/types/pageBrothers.type';

export type InvitationResponse = {
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

export type ConfigPayload = {
  index: number;
  stickers: ISticker[];
} & WidgetItem;
