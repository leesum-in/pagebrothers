import { IInvitation } from '@/types/Pagebrothers.type';
import { api } from '@repo/shared';
import { InvitationResponse } from './types';

export async function postInvitation(
  invitation: Partial<IInvitation>,
): Promise<InvitationResponse> {
  const url = '/v2/invitations';
  return api.post<InvitationResponse, InvitationResponse>(url, invitation);
}
