import type { IInvitation, IInvitationTemplate } from '@/types/pageBrothers.type';

export type InvitationResponse = {
  id: string;
};

export interface ItemsResponse {
  items: IInvitation[] | IInvitationTemplate[];
}
