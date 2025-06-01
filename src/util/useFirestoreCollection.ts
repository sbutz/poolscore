import {
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import {
  FirestoreError,
  onSnapshot,
  Query,
  queryEqual,
  QuerySnapshot,
} from 'firebase/firestore';
import useStableValue from './useStableValue';

const isQueryEqual = <T extends Query<any>>(
  v1: T | null | undefined,
  v2: T | null | undefined,
): boolean => {
  const bothNull: boolean = !v1 && !v2;
  const equal: boolean = !!v1 && !!v2 && queryEqual(v1, v2);
  return bothNull || equal;
};

export default function useFirestoreCollection<T>(docRef: Query<T> | null) {
  const ref = useStableValue(docRef, isQueryEqual);
  // TODO: combine into one state to avoid re-renders
  const [value, setValue] = useState<T[] | undefined>(undefined);
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
        (snapshot: QuerySnapshot<T>) => {
          setValue(snapshot.docs.map((d) => d.data()));
          setLoading(false);
        },
        (error: FirestoreError) => { throw error; },
      );
    },
    [ref],
  );
  const getSnapshot = useMemo(() => {
    const cache = [value, loading] as [T[] | undefined, boolean];
    return () => cache;
  }, [value, loading]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
