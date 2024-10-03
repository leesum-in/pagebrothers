import { ErrorResponse } from '@/types/Error.type';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { getInvitations, getTemplates } from './apis';
import { QUERY_KEY_INVITATIONS, QUERY_KEY_TEMPLATES } from './constants';
import { ItemsResponse } from './types';

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
