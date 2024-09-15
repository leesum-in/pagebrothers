import { API_URL } from '@/constants';
import type { RegisterData, SocialLoginResponse } from '@/types';

export async function postRegister(registerData: RegisterData): Promise<SocialLoginResponse> {
  const url = '/auth/register';
  try {
    const response = await fetch(`${API_URL}${url}`, {
      method: 'POST',
      body: JSON.stringify(registerData),
    });

    // 응답 헤더에서 토큰 추출
    const token = response.headers.get('Authorization');
    if (token) localStorage.setItem('token', token);

    const data = (await response.json()) as SocialLoginResponse;
    return data;
  } catch (error) {
    throw new Error('회원가입 실패');
  }
}
