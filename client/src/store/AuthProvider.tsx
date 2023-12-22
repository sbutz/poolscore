import {
  ReactNode, createContext, useEffect, useContext, useMemo, useCallback,
} from 'react';
import { AuthError } from 'firebase/auth';
import {
  useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignOut,
} from 'react-firebase-hooks/auth';

import { auth } from './Firebase';
import useIdTokenResult from '../util/useIdTokenResult';
import useSignInWithTableToken from '../util/useSignInWithTableToken';

interface AuthState {
  userId?: string;
  userIdLoading: boolean;
  clubId?: string;
  tableId?: string;
  admin?: boolean;
  signUp: (email: string, password: string) => void;
  signUpError?: AuthError;
  signIn: (email: string, password: string) => void;
  signInError?: AuthError;
  signInWithToken: (token: string) => void;
  signInWithTokenError?: AuthError;
  signOut: () => void;
  signOutError?: AuthError;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function useAuth() {
  const value = useContext(AuthContext);
  if (value === undefined) throw new Error('Expected auth context value to be set.');
  return value;
}

interface AuthProviderProps {
  children: ReactNode;
}
export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, userLoading, errorAuth] = useAuthState(auth, {});
  useEffect(() => { if (errorAuth) throw errorAuth; }, [errorAuth]);
  const tokenResult = useIdTokenResult(user);

  const [firebaseSignUp, , , signUpError] = useCreateUserWithEmailAndPassword(auth);
  const signUp = useCallback((email: string, password: string) => {
    if (user) throw Error('To create a new Account, you need to sign out first.');
    firebaseSignUp(email, password);
  }, [user, firebaseSignUp]);

  const [firebaseSignIn, , , signInError] = useSignInWithEmailAndPassword(auth);
  const signIn = useCallback((email: string, password: string) => {
    if (user) throw Error('To sign in, you need to sign out first.');
    firebaseSignIn(email, password);
  }, [user, firebaseSignIn]);

  const [signInWithToken, , , signInWithTokenError] = useSignInWithTableToken(auth);

  const [firebaseSignOut, , signOutError] = useSignOut(auth);
  const signOut = useCallback(() => {
    if (!user) throw Error('To sign out you need to sign in first.');
    firebaseSignOut();
  }, [user, firebaseSignOut]);

  const value = useMemo(() => ({
    userId: user?.uid,
    userIdLoading: userLoading,
    clubId: tokenResult?.claims.clubId,
    admin: tokenResult?.claims.admin,
    tableId: tokenResult?.claims.tableId,
    signUp,
    signUpError,
    signIn,
    signInError,
    signInWithToken,
    signInWithTokenError,
    signOut,
    signOutError: signOutError as AuthError,
  }), [
    user,
    userLoading,
    tokenResult,
    signUp,
    signUpError,
    signIn,
    signInError,
    signInWithToken,
    signInWithTokenError,
    signOut,
    signOutError,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
