import { API_URL } from '@/constants';

interface ErrorWithMessage {
  message: string;
}

export async function fetchWrapper<T, ErrorType extends ErrorWithMessage>(
  url: string,
  options: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, options);
  if (!response.ok) {
    const error = (await response.json()) as ErrorType;

    if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('알 수 없는 오류가 발생했습니다.');
    }
  }
  return response.json() as Promise<T>;
}
