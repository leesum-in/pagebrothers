export const SOCIAL_LOGIN_TYPES = ['KAKAO', 'NAVER', 'GOOGLE'] as const;
export type SocialLoginType = (typeof SOCIAL_LOGIN_TYPES)[number];

export type SocialLoginError = {
  message: string;
  type: string;
  code: number;
  trace?: string;
};

export type RegisterData = {
  name: string;
  email: string;
  provider: SocialLoginType;
  providerId: string;
  profileImage: string;
  acceptMarketing: boolean;
};

export type SocialLoginResponse = {
  id: string;
};

export type Me = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  provider: SocialLoginType;
};
