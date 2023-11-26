import { useCallback, useEffect, useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { Auth, AuthError, UserCredential } from 'firebase/auth';
import { AuthActionHook } from 'react-firebase-hooks/auth/dist/auth/types';
import { functions } from '../store/Firebase';
import useSignInWithCustomToken from './useSignInWithCustomToken';

interface JWT {
  jwt: string,
}

const createJWT = httpsCallable(functions, 'table-createjwt');

declare type TableTokenActionHook =
  AuthActionHook<(token: string) => Promise<UserCredential | undefined>>;

export default function useSignInWithTableToken(auth: Auth) :TableTokenActionHook {
  const [signIn, signedInUser, signInLoading, signInError] = useSignInWithCustomToken(auth);
  const [loading, setLoading] = useState<boolean>(signInLoading);
  const [error, setError] = useState<AuthError | undefined>(signInError);

  useEffect(() => { setError(signInError); }, [signInError]);

  const signInWithToken = useCallback(
    async (token: string) : Promise<UserCredential | undefined> => {
      setLoading(true);
      try {
        const { data } = await createJWT({ token });
        const { jwt } = data as JWT;
        const user = await signIn(jwt);
        setError(undefined);
        return user;
      } catch (err) {
        setError(err as AuthError);
      } finally {
        setLoading(false);
      }
    },
    [signIn],
  );

  return [signInWithToken, signedInUser, loading, error];
}
