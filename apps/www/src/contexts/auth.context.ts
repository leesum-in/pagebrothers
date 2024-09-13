'use client';

import { createContext } from 'react';

export interface AuthContextInterface {
  me: null;
}

const initialValue: AuthContextInterface = {
  me: null,
};

export const AuthContext = createContext<AuthContextInterface>(initialValue);
