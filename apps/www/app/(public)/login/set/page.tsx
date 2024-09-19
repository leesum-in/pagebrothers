import { cookies, headers } from 'next/headers';

import LoginCallbackTemplate from '@/auth/components/LogInCallbackTemplate';

function LoginCallbackPage(): React.ReactNode {
  const cookieStore = cookies();
  const headersList = headers();

  const token = cookieStore.get('pagebrothers-token')?.value ?? null;
  const backUrl = headersList.get('back-url') ?? '/';

  return <LoginCallbackTemplate token={token} backUrl={backUrl} />;
}

export default LoginCallbackPage;
