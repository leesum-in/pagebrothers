import api from '@repo/shared/src/api';

import type { Me, RegisterData, SocialLoginResponse } from '@/auth/types';

export async function getMeFromClient(): Promise<Me | null> {
  const url = '/user/me';
  const token = localStorage.getItem('pagebrothers-token');
  if (!token) {
    return null;
  }
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  return api.get<Me, Me>(url);
}

export async function postRegister(registerData: RegisterData): Promise<SocialLoginResponse> {
  const url = '/auth/register';
  return api.post<SocialLoginResponse, SocialLoginResponse>(url, registerData);
}
