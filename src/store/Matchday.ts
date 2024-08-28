import {
  collection, doc, DocumentData, FirestoreDataConverter, query, QueryDocumentSnapshot, setDoc,
  SnapshotOptions, updateDoc, where, WithFieldValue,
} from 'firebase/firestore';
import { useEffect, useMemo } from 'react';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { initialMatchday, Matchday } from '../lib/Matchday';
import { db } from './Firebase';
import { useAuth } from './AuthProvider';

function MatchdayConverter(clubId: string) : FirestoreDataConverter<Matchday> {
  return {
    toFirestore(matchday: WithFieldValue<Matchday>): DocumentData {
      const { id, ...data } = matchday;
      return { clubId, ...data };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Matchday {
      const { clubId: cId, ...data } = snapshot.data(options);
      return { id: snapshot.id, ...data } as Matchday;
    },
  };
}

function useMatchdayConverter() {
  const { clubId } = useAuth();
  const matchdayConverter = useMemo(() => (clubId ? MatchdayConverter(clubId) : null), [clubId]);
  return matchdayConverter;
}

export function useMatchdays() {
  const { clubId } = useAuth();
  const matchdayConverter = useMatchdayConverter();
  const ref = matchdayConverter ? query(collection(db, 'matchdays'), where('clubId', '==', clubId)).withConverter(matchdayConverter) : null;
  const [values, loading, error] = useCollectionData<Matchday>(ref, {});
  useEffect(() => { if (error) throw error; }, [error]);

  return [values, loading, error] as [Matchday[] | undefined, boolean, Error];
}

export function useMatchday(id?: string) {
  const matchdayConverter = useMatchdayConverter();
  const ref = id && matchdayConverter ? doc(db, 'matchdays', id).withConverter(matchdayConverter) : null;
  const [values, loading, error] = useDocumentData<Matchday>(ref, {});
  useEffect(() => { if (error) throw error; }, [error]);

  return [values, loading, error] as [Matchday | undefined, boolean, Error];
}

export function useCreateMatchday() {
  const matchdayConverter = useMatchdayConverter();

  const fn = useMemo(() => async () => {
    if (!matchdayConverter) throw new Error('No converter');
    const ref = doc(collection(db, 'matchdays')).withConverter(matchdayConverter);
    await setDoc<Matchday, DocumentData>(ref, initialMatchday);
    return ref.id;
  }, [matchdayConverter]);

  return fn;
}

export function useUpdateMatchday() {
  const matchdayConverter = useMatchdayConverter();

  const fn = useMemo(() => async (matchday: Matchday) => {
    if (!matchdayConverter) throw new Error('No converter');
    const ref = doc(db, 'matchdays', matchday.id).withConverter(matchdayConverter);
    await updateDoc<Matchday, DocumentData>(ref, matchday);
  }, [matchdayConverter]);

  return fn;
}
