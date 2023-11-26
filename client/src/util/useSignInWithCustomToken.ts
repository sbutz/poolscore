import {
  Auth,
  AuthError,
  signInWithCustomToken as firebaseSignInWithCustomToken,
  UserCredential,
} from 'firebase/auth';
import { useCallback, useState } from 'react';
import { AuthActionHook } from 'react-firebase-hooks/auth/dist/auth/types';

declare type CustomTokenActionHook =
  AuthActionHook<(token: string) => Promise<UserCredential | undefined>>;

export default (auth: Auth) : CustomTokenActionHook => {
  const [error, setError] = useState<AuthError>();
  const [loggedInUser, setLoggedInUser] = useState<UserCredential>();
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithCustomToken = useCallback(
    async (token: string) => {
      setLoading(true);
      setError(undefined);
      try {
        const user = await firebaseSignInWithCustomToken(auth, token);
        setLoggedInUser(user);

        return user;
      } catch (err) {
        setError(err as AuthError);
      } finally {
        setLoading(false);
      }
    },
    [auth],
  );

  return [signInWithCustomToken, loggedInUser, loading, error];
};
