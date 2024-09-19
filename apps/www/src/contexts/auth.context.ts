'use client';

import { createContext } from 'react';

import type { Me } from '@/types';

export interface AuthContextInterface {
  me: Me | null;
  logInStartWithKakao: () => void;
  logOut: () => void;
}

const initialValue: AuthContextInterface = {
  me: null,
  logInStartWithKakao: () => {},
  logOut: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(initialValue);
