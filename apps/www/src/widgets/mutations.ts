import type {
  IInvitation,
  IInvitationImageData,
  WidgetItem,
} from '@repo/shared/src/types/pageBrothers.type';
import { useMutation, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import {
  deleteWidget,
  postImage,
  postInvitation,
  postWidget,
  putEventInfo,
  putInvitationConfig,
} from '@/www/widgets/apis';
import { QUERY_KEY_INVITATION } from '@/www/widgets/constants';
import type { ConfigPayload, EventInfoData, IdResponse, WidgetData } from '@/www/widgets/types';

export function useInvitationMutation(): UseMutationResult<
  IdResponse,
  Error,
  Partial<IInvitation>
> {
  const queryClient = useQueryClient();
  return useMutation<IdResponse, Error, Partial<IInvitation>>({
    mutationFn: (invitation: Partial<IInvitation>) => postInvitation(invitation),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_INVITATION, data.id] });
    },
  });
}

export function useInvitationConfigMutation(
  invitationId: string,
): UseMutationResult<ConfigPayload, Error, ConfigPayload> {
  const queryClient = useQueryClient();
  return useMutation<ConfigPayload, Error, ConfigPayload>({
    mutationFn: (configData: ConfigPayload) => putInvitationConfig(configData),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_INVITATION, invitationId] });
    },
  });
}

export function useWidgetMutation(
  invitationId: string,
): UseMutationResult<IdResponse, Error, WidgetData> {
  const queryClient = useQueryClient();
  return useMutation<IdResponse, Error, WidgetData>({
    mutationFn: (widgetData: WidgetData) => postWidget(widgetData),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_INVITATION, invitationId] });
    },
  });
}

export function useEventInfoMutation(
  invitationId: string,
): UseMutationResult<IInvitation, Error, EventInfoData> {
  const queryClient = useQueryClient();
  return useMutation<IInvitation, Error, EventInfoData>({
    mutationFn: (eventInfoData: EventInfoData) => putEventInfo(eventInfoData),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_INVITATION, invitationId] });
    },
  });
}

export function useInvitationImageMutation(
  invitationId: string,
): UseMutationResult<IInvitationImageData, Error, FormData> {
  const queryClient = useQueryClient();
  return useMutation<IInvitationImageData, Error, FormData>({
    mutationFn: (imageData: FormData) => postImage(imageData, invitationId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_INVITATION, invitationId] });
    },
  });
}

export function useWidgetDeleteMutation(
  invitationId: string,
): UseMutationResult<WidgetItem, Error, string> {
  const queryClient = useQueryClient();
  return useMutation<WidgetItem, Error, string>({
    mutationFn: (widgetId: string) => deleteWidget(widgetId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY_INVITATION, invitationId] });
    },
  });
}
