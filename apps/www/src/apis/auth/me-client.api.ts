import type { Me, SocialLoginError } from '@/types';
import { fetchWrapper } from '@/utils';

export async function getMeFromClient(): Promise<Me | null> {
  const url = '/user/me';
  const token = localStorage.getItem('pagebrothers-token');

  if (!token) {
    return null;
  }

  // 토큰을 로컬 스토리지에 저장하지 않는데 이게 쓸모가 있을까?
  const data = await fetchWrapper<Me, SocialLoginError>(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return data;
}
