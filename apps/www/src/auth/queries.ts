import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { getMeFromClient } from './apis';
import { QUERY_KEY_ME } from './constants';
import type { Me, SocialLoginError } from './types';

export function useMeQuery(): UseQueryResult<Me | null, SocialLoginError> {
  return useQuery<Me | null, SocialLoginError>({
    queryKey: [QUERY_KEY_ME],
    queryFn: getMeFromClient,
  });
}
