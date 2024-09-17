'use client';

import { createContext } from 'react';

import type { MeResponse } from '@/types';

export interface AuthContextInterface {
  me: MeResponse | null;
  logInStartWithKakao: () => void;
}

const initialValue: AuthContextInterface = {
  me: null,
  logInStartWithKakao: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(initialValue);
