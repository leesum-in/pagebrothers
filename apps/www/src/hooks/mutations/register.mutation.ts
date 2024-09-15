import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { postRegister } from '@/apis/auth';
import { QUERY_KEY_ME } from '@/constants';
import type { RegisterData, SocialLoginResponse } from '@/types';

export function useRegisterMutation(): UseMutationResult<SocialLoginResponse, Error, RegisterData> {
  const queryClient = useQueryClient();
  return useMutation<SocialLoginResponse, Error, RegisterData>({
    mutationFn: (registerData: RegisterData) => postRegister(registerData),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ME] });
    },
  });
}
