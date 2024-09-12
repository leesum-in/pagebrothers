import { useContext } from 'react';

import { AuthContext, type AuthContextInterface } from '@/contexts';

export function useAuth(): AuthContextInterface {
  return useContext(AuthContext);
}
