export enum SocialLoginType {
  KAKAO = 'KAKAO',
  NAVER = 'NAVER',
  GOOGLE = 'GOOGLE',
}

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

export type MeResponse = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  provider: SocialLoginType;
};
