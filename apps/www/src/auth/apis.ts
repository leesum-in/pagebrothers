import type { Me, RegisterData, SocialLoginResponse } from '@/auth/types';
import api from '@repo/shared/src/api';

export async function getMeFromClient(): Promise<Me | null> {
  const url = '/user/me';
  const token = localStorage.getItem('pagebrothers-token');

  if (!token) {
    return null;
  }

  const response = await api.get<Me>(url);
  return response.data;
}

interface GetMeFromServerProps {
  token: string | null;
}

export async function getMeFromServer({ token }: GetMeFromServerProps): Promise<Me | null> {
  const url = '/user/me';
  if (!token) {
    return null;
  }
  const response = await api.get<Me>(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postRegister(registerData: RegisterData): Promise<SocialLoginResponse> {
  const url = '/auth/register';
  const response = await api.post<SocialLoginResponse>(url, registerData);
  return response.data;
}
