import type { MeResponse, SocialLoginError } from '@/types';
import { fetchWrapper } from '@/utils';

interface GetMeFromServerProps {
  token: string | null;
}

export async function getMeFromServer({ token }: GetMeFromServerProps): Promise<MeResponse | null> {
  const url = '/user/me';
  if (!token) {
    return null;
  }
  const data = await fetchWrapper<MeResponse, SocialLoginError>(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

// 수정 요망
