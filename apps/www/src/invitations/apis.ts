import { api } from '@repo/shared';

import type { IInvitation } from '@/types/Pagebrothers.type';

import type { InvitationResponse, ItemsResponse } from './types';

export async function getTemplates(): Promise<ItemsResponse> {
  const url = '/v2/templates?stage=BEST';
  return api.get<ItemsResponse, ItemsResponse>(url);
}

export async function getInvitation(id: string): Promise<InvitationResponse> {
  const url = `/v2/invitations/${id}`;
  return api.get<InvitationResponse, InvitationResponse>(url);
}

export async function getInvitations(): Promise<ItemsResponse> {
  const url = '/v2/invitations';
  return api.get<ItemsResponse, ItemsResponse>(url);
}

export async function postInvitation(
  invitation: Partial<IInvitation>,
): Promise<InvitationResponse> {
  const url = '/v2/invitations';
  return api.post<InvitationResponse, InvitationResponse>(url, invitation);
}
