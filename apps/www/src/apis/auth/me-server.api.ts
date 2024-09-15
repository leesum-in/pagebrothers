import type { MeResponse, SocialLoginError } from '@/types';
import { fetchWrapper } from '@/utils';

export async function getMeFromServer(): Promise<MeResponse> {
  const url = '/user/me';
  const data = await fetchWrapper<MeResponse, SocialLoginError>(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return data;
}

// 수정 요망
