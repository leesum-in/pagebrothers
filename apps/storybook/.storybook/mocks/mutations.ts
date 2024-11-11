export const useInvitationConfigMutation = (invitationId: string) => {
  return {
    mutate: (data: any) => {
      console.log('Mock mutate called with data:', data);
      // 필요한 경우 추가적인 모킹 동작을 정의할 수 있습니다.
    },
    // 필요한 다른 속성이나 메서드를 여기에 추가
  };
};

export const useInvitationMutation = () => {
  return {
    mutate: () => {
      console.log('Mock mutate called');
    },
  };
};

export const useWidgetMutation = () => {
  return {
    mutate: () => {
      console.log('Mock mutate called');
    },
  };
};

export const useEventInfoMutation = () => {
  return {
    mutate: () => {
      console.log('Mock mutate called');
    },
  };
};

export const useInvitationImageMutation = () => {
  return {
    mutate: () => {
      console.log('Mock mutate called');
    },
  };
};
