import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { getMeFromClient } from '@/www/auth/apis';
import { QUERY_KEY_ME } from '@/www/auth/constants';
import type { Me, SocialLoginError } from '@/www/auth/types';

export function useMeQuery(): UseQueryResult<Me | null, SocialLoginError> {
  return useQuery<Me | null, SocialLoginError>({
    queryKey: [QUERY_KEY_ME],
    queryFn: getMeFromClient,
  });
}
