import type { Me, SocialLoginError } from '@/types';
import { fetchWrapper } from '@/utils';

export async function getMeFromClient(): Promise<Me | null> {
  const url = '/user/me';
  const token = localStorage.getItem('pagebrothers-token');

  if (!token) {
    return null;
  }

  const data = await fetchWrapper<Me, SocialLoginError>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
