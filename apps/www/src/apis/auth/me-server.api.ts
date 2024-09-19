import type { Me, SocialLoginError } from '@/types';
import { fetchWrapper } from '@/utils';

interface GetMeFromServerProps {
  token: string | null;
}

export async function getMeFromServer({ token }: GetMeFromServerProps): Promise<Me | null> {
  const url = '/user/me';
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
