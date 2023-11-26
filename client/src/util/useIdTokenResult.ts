import { IdTokenResult, User } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function useIdTokenResult(
  user: User | null | undefined,
) : IdTokenResult | undefined {
  const [tokenResult, setTokenResult] = useState<IdTokenResult | undefined>();

  useEffect(() => {
    (async () => {
      if (user) {
        try {
          const result = await user.getIdTokenResult();
          setTokenResult(result);
        } catch {
          setTokenResult(undefined);
        }
      } else {
        setTokenResult(undefined);
      }
    })();
  }, [user]);

  return tokenResult;
}
