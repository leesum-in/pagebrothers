import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { postRegister } from '@/www/auth/apis';
import { QUERY_KEY_ME } from '@/www/auth/constants';
import type { RegisterData, SocialLoginResponse } from '@/www/auth/types';

export function useRegisterMutation(): UseMutationResult<SocialLoginResponse, Error, RegisterData> {
  const queryClient = useQueryClient();
  return useMutation<SocialLoginResponse, Error, RegisterData>({
    mutationFn: (registerData: RegisterData) => postRegister(registerData),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}
