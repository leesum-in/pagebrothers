import type { Me, RegisterData, SocialLoginResponse } from '@/auth/types';
import api from '@repo/shared/src/api';

export async function getMeFromClient(): Promise<Me | null> {
  const url = '/user/me';
  const token = localStorage.getItem('pagebrothers-token');
  if (!token) {
    return null;
  }
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  return await api.get<Me, Me>(url);
}

interface GetMeFromServerProps {
  token: string | null;
}

export async function getMeFromServer({ token }: GetMeFromServerProps): Promise<Me | null> {
  const url = '/user/me';
  if (!token) {
    return null;
  }
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
  return await api.get<Me, Me>(url);
}

export async function postRegister(registerData: RegisterData): Promise<SocialLoginResponse> {
  const url = '/auth/register';
  const response = await api.post<SocialLoginResponse>(url, registerData);
  return response.data;
}
