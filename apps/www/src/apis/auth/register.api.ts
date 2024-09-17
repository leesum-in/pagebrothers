import type { RegisterData, SocialLoginError, SocialLoginResponse } from '@/types';
import { fetchWrapper } from '@/utils';

export async function postRegister(registerData: RegisterData): Promise<SocialLoginResponse> {
  const url = '/auth/register';
  const data = await fetchWrapper<SocialLoginResponse, SocialLoginError>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });
  return data;
}
