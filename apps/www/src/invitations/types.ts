import type { IInvitation, IInvitationTemplate } from '@/types/Pagebrothers.type';

export type InvitationResponse = {
  id: string;
};

export interface ItemsResponse {
  items: IInvitation[] | IInvitationTemplate[];
}
