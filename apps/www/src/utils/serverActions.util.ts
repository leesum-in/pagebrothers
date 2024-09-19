'use server';

import { cookies } from 'next/headers';

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = cookies();
  await cookieStore.delete(name);
  await cookieStore.set(name, '', { maxAge: 0 });
}
