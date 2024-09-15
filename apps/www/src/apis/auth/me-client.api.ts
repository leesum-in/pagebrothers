import type { MeResponse, SocialLoginError } from '@/types';
import { fetchWrapper } from '@/utils';

export async function getMeFromClient(): Promise<MeResponse> {
  const url = '/user/me';
  const data = await fetchWrapper<MeResponse, SocialLoginError>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return data;
}
