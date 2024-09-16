'use client';

import { createContext } from 'react';

export interface AuthContextInterface {
  me: null;
  logInWithKakao: () => void;
}

const initialValue: AuthContextInterface = {
  me: null,
  logInWithKakao: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(initialValue);
