import {
  collection, doc, DocumentData, documentId, FirestoreDataConverter, query, QueryDocumentSnapshot,
  setDoc, SnapshotOptions, where, WithFieldValue,
  writeBatch,
} from 'firebase/firestore';
import { useEffect, useMemo } from 'react';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { initialMatchday, Matchday } from '../lib/Matchday';
import { db } from './Firebase';
import { useAuth } from './AuthProvider';
import { Game } from '../lib/Game';

function MatchdayConverter(clubId: string) : FirestoreDataConverter<Matchday> {
  return {
    toFirestore(matchday: WithFieldValue<Matchday>): DocumentData {
      const gameRefs = (matchday.games as Game[]).map((g) => doc(db, 'games', g.id));
      const { id, ...data } = matchday;
      return { ...data, games: gameRefs, clubId };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Matchday {
      const { clubId: cId, ...data } = snapshot.data(options);
      return { id: snapshot.id, ...data } as Matchday;
    },
  };
}

function useMatchdayConverter() {
  const { clubId } = useAuth();
  const converter = useMemo(() => (clubId ? MatchdayConverter(clubId) : null), [clubId]);
  return converter;
}

function GameConverter(clubId: string) : FirestoreDataConverter<Game> {
  return {
    toFirestore(game: WithFieldValue<Game>): DocumentData {
      const { id, ...data } = game;
      return { clubId, ...data };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Game {
      const { clubId: cId, ...data } = snapshot.data(options);
      return { id: snapshot.id, ...data } as Game;
    },
  };
}

function useGameConverter() {
  const { clubId } = useAuth();
  const converter = useMemo(() => (clubId ? GameConverter(clubId) : null), [clubId]);
  return converter;
}

export function useMatchdays() {
  const { clubId } = useAuth();
  const matchdayConverter = useMatchdayConverter();
  const matchdayRef = matchdayConverter ? query(collection(db, 'matchdays'), where('clubId', '==', clubId)).withConverter(matchdayConverter) : null;
  const [values, loading, error] = useCollectionData<Matchday>(matchdayRef);
  useEffect(() => { if (error) throw error; }, [error]);

  const matchdays = values?.map((matchday) => ({ ...matchday, games: [] }));
  return [matchdays, loading, error] as [Matchday[] | undefined, boolean, Error];
}

export function useMatchday(id?: string) {
  const matchdayConverter = useMatchdayConverter();
  const matchdayRef = id && matchdayConverter ? doc(db, 'matchdays', id).withConverter(matchdayConverter) : null;
  const [matchdayValue, matchdayLoading, matchdayError] = useDocumentData<Matchday>(matchdayRef);
  useEffect(() => { if (matchdayError) throw matchdayError; }, [matchdayError]);

  const gameConverter = useGameConverter();
  const gameIds = matchdayValue?.games.map((game) => doc(db, 'games', game.id));
  const gameRefs = gameConverter && gameIds && gameIds.length > 0 ? query(collection(db, 'games'), where(documentId(), 'in', gameIds)).withConverter(gameConverter) : null;
  const [gamesValue, gamesLoading, gamesError] = useCollectionData<Game>(gameRefs);

  const sortedGames = gameIds && gamesValue
    ? gameIds.map((ref) => gamesValue.find((g) => g.id === ref.id)).filter((g) => g !== undefined)
    : [];

  const loading = matchdayLoading || gamesLoading;
  const error = matchdayError || gamesError;
  const value = !error && !loading && matchdayValue
    ? { ...matchdayValue, games: sortedGames } : undefined;

  return [value, loading, error] as [Matchday | undefined, boolean, Error];
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
    await setDoc<Matchday, DocumentData>(ref, matchday, { merge: true });
  }, [matchdayConverter]);

  return fn;
}

export function useCreateGame() {
  const matchdayConverter = useMatchdayConverter();
  const gameConverter = useGameConverter();

  const fn = useMemo(() => async (game: Game, matchday: Matchday) => {
    if (!matchdayConverter || !gameConverter) throw new Error('No converter');
    const matchdayRef = doc(db, 'matchdays', matchday.id).withConverter(matchdayConverter);
    const gameRef = doc(collection(db, 'games')).withConverter(gameConverter);
    const newGame = { ...game, id: gameRef.id };

    const batch = writeBatch(db);
    batch.set(gameRef, game);
    batch.set(matchdayRef, { games: [...matchday.games, newGame] }, { merge: true });
    await batch.commit();
  }, [matchdayConverter, gameConverter]);

  return fn;
}

export function useUpdateGame() {
  const converter = useGameConverter();

  const fn = useMemo(() => async (game: Game) => {
    if (!converter) throw new Error('No converter');
    const gameRef = doc(db, 'games', game.id).withConverter(converter);

    await setDoc(gameRef, game, { merge: true });
  }, [converter]);

  return fn;
}

export function useGames() {
  const { clubId } = useAuth();
  const converter = useGameConverter();
  const ref = converter ? query(collection(db, 'games'), where('clubId', '==', clubId)).withConverter(converter) : null;
  const [values, loading, error] = useCollectionData<Game>(ref);
  useEffect(() => { if (error) throw error; }, [error]);

  return [values, loading, error] as [Game[] | undefined, boolean, Error];
}

export function useGame(id?: string) {
  const converter = useGameConverter();
  const ref = id && converter ? doc(db, 'games', id).withConverter(converter) : null;
  const [value, loading, error] = useDocumentData<Game>(ref);
  useEffect(() => { if (error) throw error; }, [error]);

  return [value, loading, error] as [Game | undefined, boolean, Error];
}
