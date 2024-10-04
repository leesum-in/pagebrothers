import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import type { IInvitation } from '@/types/pageBrothers.type';

import { postInvitation } from './apis';
import { QUERY_KEY_INVITATION } from './constants';
import type { InvitationResponse } from './types';

export function useInvitationMutation(): UseMutationResult<
  InvitationResponse,
  Error,
  Partial<IInvitation>
> {
  const queryClient = useQueryClient();
  return useMutation<InvitationResponse, Error, Partial<IInvitation>>({
    mutationFn: (invitation: Partial<IInvitation>) => postInvitation(invitation),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_INVITATION, data.id] });
    },
  });
}
