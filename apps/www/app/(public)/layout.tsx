import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Suspense, type PropsWithChildren } from 'react';

import { getMeFromServer } from '@/auth/apis';
import { QUERY_KEY_ME } from '@/auth/constants';
import Header from '@/common/components/Header';

async function ProviderLayout({ children }: PropsWithChildren): Promise<React.ReactNode> {
  const cookieStore = cookies();
  const token = cookieStore.get('pagebrothers-token')?.value;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_ME],
    queryFn: () => getMeFromServer({ token: token ?? null }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HydrationBoundary state={dehydratedState}>
        <Header />
        {children}
      </HydrationBoundary>
    </Suspense>
  );
}

export default ProviderLayout;
