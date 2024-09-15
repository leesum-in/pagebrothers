import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { getMeFromClient } from '@/apis/auth/me-client.api';
import { QUERY_KEY_ME } from '@/constants';
import type { MeResponse, SocialLoginError } from '@/types';

export function useMeQuery(): UseQueryResult<MeResponse, SocialLoginError> {
  return useQuery<MeResponse, SocialLoginError>({
    queryKey: [QUERY_KEY_ME],
    queryFn: getMeFromClient,
  });
}
