import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from '@/types/Error.type';

import { getInvitation, getInvitations, getTemplates } from './apis';
import { QUERY_KEY_INVITATION, QUERY_KEY_INVITATIONS, QUERY_KEY_TEMPLATES } from './constants';
import type { InvitationResponse, ItemsResponse } from './types';

export function useInvitationQuery(
  id: string,
): UseQueryResult<InvitationResponse | null, ErrorResponse> {
  return useQuery<InvitationResponse | null, ErrorResponse>({
    queryKey: [QUERY_KEY_INVITATION, id],
    queryFn: () => getInvitation(id),
    enabled: Boolean(id),
  });
}

export function useInvitationsQuery(): UseQueryResult<ItemsResponse | null, ErrorResponse> {
  return useQuery<ItemsResponse | null, ErrorResponse>({
    queryKey: [QUERY_KEY_INVITATIONS],
    queryFn: getInvitations,
  });
}

export function useTemplatesQuery(): UseQueryResult<ItemsResponse | null, ErrorResponse> {
  return useQuery<ItemsResponse | null, ErrorResponse>({
    queryKey: [QUERY_KEY_TEMPLATES],
    queryFn: getTemplates,
  });
}
