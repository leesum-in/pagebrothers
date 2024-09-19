'use server';

import { cookies } from 'next/headers';

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(name);
  cookieStore.set(name, '', { maxAge: 0 });
}
