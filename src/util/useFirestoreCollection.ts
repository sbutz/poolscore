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
  QueryDocumentSnapshot,
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

const areQueriesEqual = <T extends Query<any>[]>(
  v1: T | null | undefined,
  v2: T | null | undefined,
): boolean => {
  if (!v1 && !v2) return true;
  if (!v1 || !v2) return false;
  if (v1.length !== v2.length) return false;
  return v1.every((q, i) => isQueryEqual(q, v2[i]));
};

export default function useFirestoreCollection<T>(q: Query<T>[] | Query<T> | null) {
  const refs = useStableValue(Array.isArray(q) || q == null ? q : [q], areQueriesEqual);
  // TODO: combine into one state to avoid re-renders
  const [value, setValue] = useState<QueryDocumentSnapshot<T>[]>([]);
  const [loading, setLoading] = useState(0);

  const subscribe = useCallback(
    () => {
      if (!refs) {
        setValue([]);
        setLoading(0);
        return () => {};
      }
      setLoading(refs.length);
      const unsubscribes = refs.map((ref) => onSnapshot(
        ref,
        (snapshot: QuerySnapshot<T>) => {
          setValue((v) => {
            const prev = v.filter((d) => !snapshot.docs.some((s) => s.id === d.id));
            return [...prev, ...snapshot.docs];
          });
          setLoading((l) => l - 1);
        },
        (error: FirestoreError) => { throw error; },
      ));
      return () => {
        unsubscribes.forEach((f) => f());
      };
    },
    [refs],
  );
  const getSnapshot = useMemo(() => {
    const cache = [value.map((d) => d.data()), loading > 0] as [T[], boolean];
    return () => cache;
  }, [value, loading]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
