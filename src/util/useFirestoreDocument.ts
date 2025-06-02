import {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  FirestoreError,
  onSnapshot,
  refEqual,
} from 'firebase/firestore';
import useStableValue from './useStableValue';

function isRefEqual<T extends DocumentReference<any> | CollectionReference<any>>(
  v1: T | null | undefined,
  v2: T | null | undefined,
): boolean {
  const bothNull: boolean = !v1 && !v2;
  const equal: boolean = !!v1 && !!v2 && refEqual(v1, v2);
  return bothNull || equal;
}

export default function useFirestoreDocument<T>(docRef: DocumentReference<T> | null) {
  const ref = useStableValue(docRef, isRefEqual);
  // TODO: combine into one state to avoid re-renders
  const [value, setValue] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const subscribe = useCallback(
    () => {
      if (!ref) {
        setValue(undefined);
        setLoading(false);
        return () => {};
      }
      return onSnapshot(
        ref,
        (snapshot: DocumentSnapshot<T>) => {
          setValue(snapshot.data());
          setLoading(false);
        },
        (error: FirestoreError) => { throw error; },
      );
    },
    [ref],
  );
  const getSnapshot = useMemo(() => {
    const cache = [value, loading] as [T | undefined, boolean];
    return () => cache;
  }, [value, loading]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
