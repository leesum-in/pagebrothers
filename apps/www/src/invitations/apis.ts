import { api } from '@repo/shared';

import type { IInvitation } from '@/types/pageBrothers.type';

import type { ConfigPayload, EventInfoData, IdResponse, ItemsResponse, WidgetData } from './types';

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

export async function postInvitation(invitation: Partial<IInvitation>): Promise<IdResponse> {
  const url = '/v2/invitations';
  return api.post<IdResponse, IdResponse>(url, invitation);
}

export async function putInvitationConfig(configData: ConfigPayload): Promise<ConfigPayload> {
  const url = `/widgets/${configData.id}/config`;
  return api.put<ConfigPayload, ConfigPayload>(url, configData);
}

export async function postWidget(widgetData: WidgetData): Promise<IdResponse> {
  const url = `/invitations/${widgetData.id}/widgets`;
  return api.post<IdResponse, IdResponse>(url, widgetData.widget);
}

export async function putEventInfo(eventInfoData: EventInfoData): Promise<IInvitation> {
  const url = `/v2/invitations/${eventInfoData.id}/event-info`;
  return api.put<IInvitation, IInvitation>(url, eventInfoData.eventInfo);
}
