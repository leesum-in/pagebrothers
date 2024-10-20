import { api } from '@repo/shared';

import type { IInvitation } from '@/types/pageBrothers.type';

import type { ConfigPayload, InvitationResponse, ItemsResponse } from './types';

export async function getTemplates(): Promise<ItemsResponse> {
  const url = '/v2/templates?stage=BEST';
  return api.get<ItemsResponse, ItemsResponse>(url);
}

export async function getInvitation(id: string): Promise<IInvitation> {
  const url = `/v2/invitations/${id}`;
  return api.get<IInvitation, IInvitation>(url);
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

export async function putInvitationConfig(configData: ConfigPayload): Promise<ConfigPayload> {
  const url = `/widgets/${configData.id}/config`;
  return api.put<ConfigPayload, ConfigPayload>(url, configData);
}
