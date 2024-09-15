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
