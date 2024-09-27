'use server';

import { cookies } from 'next/headers';

// eslint-disable-next-line @typescript-eslint/require-await -- 이 함수는 use server를 사용하므로 비동기 함수로 선언해야 합니다.
export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(name);
  cookieStore.set(name, '', { maxAge: 0 });
}
