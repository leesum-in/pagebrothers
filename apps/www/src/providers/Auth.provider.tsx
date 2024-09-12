'use client';

import { type PropsWithChildren } from 'react';
import { AuthContext } from '../contexts';

export function AuthProvider({ children }: PropsWithChildren): React.ReactNode {
  const value = {
    me: null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
