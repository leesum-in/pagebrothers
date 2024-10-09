import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import type { IInvitation } from '@/types/pageBrothers.type';

import { postInvitation, postInvitationConfig } from './apis';
import { QUERY_KEY_INVITATION } from './constants';
import type { ConfigData, InvitationResponse } from './types';

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

export function useInvitationConfigMutation(
  invitationId: string,
): UseMutationResult<ConfigData, Error, ConfigData> {
  const queryClient = useQueryClient();
  return useMutation<ConfigData, Error, ConfigData>({
    mutationFn: (configData: ConfigData) => postInvitationConfig({ configData, invitationId }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_INVITATION, invitationId] });
    },
  });
}
