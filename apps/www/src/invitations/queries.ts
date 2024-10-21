import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from '@/types/error.type';
import type { IInvitation } from '@/types/pageBrothers.type';

import {
  getInvitation,
  getInvitations,
  getKakaoAddress,
  getKakaoKeyword,
  getTemplates,
} from './apis';
import {
  QUERY_KEY_INVITATION,
  QUERY_KEY_INVITATIONS,
  QUERY_KEY_KAKAO_ADDRESS,
  QUERY_KEY_KAKAO_KEYWORD,
  QUERY_KEY_TEMPLATES,
} from './constants';
import type {
  IntroSearchQuery,
  ItemsResponse,
  KakaoAddressResponse,
  KakaoKeywordResponse,
} from './types';

export function useInvitationQuery(id: string): UseQueryResult<IInvitation | null, ErrorResponse> {
  return useQuery<IInvitation | null, ErrorResponse>({
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

export function useKakaoKeywordQuery(
  query: IntroSearchQuery,
): UseQueryResult<KakaoKeywordResponse | null, ErrorResponse> {
  return useQuery<KakaoKeywordResponse | null, ErrorResponse>({
    queryKey: [QUERY_KEY_KAKAO_KEYWORD, query],
    queryFn: () => getKakaoKeyword(query.value),
    enabled: query.engine === 'KAKAO' && Boolean(query.value),
  });
}

export function useKakaoAddressQuery(
  query: IntroSearchQuery,
): UseQueryResult<KakaoAddressResponse | null, ErrorResponse> {
  return useQuery<KakaoAddressResponse | null, ErrorResponse>({
    queryKey: [QUERY_KEY_KAKAO_ADDRESS, query],
    queryFn: () => getKakaoAddress(query.value),
    enabled: query.engine === 'KAKAO' && Boolean(query.value),
  });
}
