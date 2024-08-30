import {
  ReactNode, createContext, useEffect, useContext, useMemo,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebase';

interface AuthState {
  userId?: string;
  clubId?: string;
  loading: boolean;
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
  const [user, loading, error] = useAuthState(auth, {});
  // const tokenResult = useIdTokenResult(user);

  useEffect(() => { if (error) throw error; }, [error]);

  const value = useMemo(() => ({
    userId: user?.uid,
    // TODO: revert back to clubId or switch to uid
    // clubId: tokenResult?.claims.clubId as string | undefined,
    clubId: user?.uid,
    loading,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
