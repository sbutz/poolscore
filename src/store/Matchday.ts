import {
  collection, doc, DocumentData, documentId, DocumentReference, FirestoreDataConverter,
  orderBy,
  PartialWithFieldValue, query, QueryDocumentSnapshot, setDoc, SnapshotOptions, Timestamp,
  where, writeBatch,
} from 'firebase/firestore';
import { useEffect, useMemo } from 'react';
import { useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore';
import { League, Matchday } from '../lib/Matchday';
import { db } from './Firebase';
import { useAuth } from './AuthProvider';
import { Game } from '../lib/Game';

function MatchdayConverter(clubId: string) : FirestoreDataConverter<Matchday> {
  return {
    toFirestore(matchday: PartialWithFieldValue<Matchday>): DocumentData {
      const {
        id, date, games, ...data
      } = matchday;
      let d : DocumentData = { ...data, clubId };
      if (games) {
        const gameRefs = (matchday.games as Game[]).map((g) => doc(db, 'games', g.id));
        d = { ...d, games: gameRefs };
      }
      if (date) {
        d = { ...d, date: Timestamp.fromDate(new Date(date as Date)) };
      }

      return d;
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Matchday {
      const { clubId: cId, date, ...data } = snapshot.data(options);
      return {
        id: snapshot.id,
        date: (date as Timestamp).toDate(),
        ...data,
      } as Matchday;
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
    toFirestore(game: PartialWithFieldValue<Game>): DocumentData {
      const { id, ...data } = game;
      return { ...data, clubId };
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
  const matchdayRef = matchdayConverter
    ? query(
      collection(db, 'matchdays'),
      where('clubId', '==', clubId),
      orderBy('date', 'desc'),
    ).withConverter(matchdayConverter)
    : null;
  const [matchdayValues, matchdayLoading, matchdayError] = useCollectionData<Matchday>(matchdayRef);
  useEffect(() => { if (matchdayError) throw matchdayError; }, [matchdayError]);

  const gameConverter = useGameConverter();
  const gameIds = matchdayValues
    ? matchdayValues.reduce(
      (acc, m) => acc.concat(
        m.games.map((g) => doc(db, 'games', g.id)),
      ),
      [] as DocumentReference<DocumentData, DocumentData>[],
    )
    : undefined;
  const gameRefs = gameConverter && gameIds && gameIds.length > 0
    ? query(collection(db, 'games'), where(documentId(), 'in', gameIds)).withConverter(gameConverter)
    : null;
  const [gameValues, gameLoading, gameError] = useCollectionData<Game>(gameRefs);
  useEffect(() => { if (gameError) throw gameError; }, [gameError]);

  const loading = matchdayLoading || gameLoading;
  const error = matchdayError || gameError;
  const value = !error && !loading && matchdayValues ? matchdayValues.map((m) => {
    const sortedGames = m.games
      .map((game) => gameValues?.find((g) => g.id === game.id))
      .filter((g) => g !== undefined);
    return { ...m, games: sortedGames } as Matchday;
  }) : undefined;

  return [value, loading, error] as [Matchday[] | undefined, boolean, Error];
}

export function useMatchday(id?: string) {
  const matchdayConverter = useMatchdayConverter();
  const matchdayRef = id && matchdayConverter ? doc(db, 'matchdays', id).withConverter(matchdayConverter) : null;
  const [matchdayValue, matchdayLoading, matchdayError] = useDocumentData<Matchday>(matchdayRef);
  useEffect(() => { if (matchdayError) throw matchdayError; }, [matchdayError]);

  const gameConverter = useGameConverter();
  const gameIds = matchdayValue?.games.map((game) => doc(db, 'games', game.id));
  const gameRefs = gameConverter && gameIds && gameIds.length > 0
    ? query(collection(db, 'games'), where(documentId(), 'in', gameIds)).withConverter(gameConverter)
    : null;
  const [gamesValue, gamesLoading, gamesError] = useCollectionData<Game>(gameRefs);
  useEffect(() => { if (gamesError) throw gamesError; }, [gamesError]);

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
  const gameConverter = useGameConverter();

  const fn = useMemo(() => async (league: League) => {
    if (!matchdayConverter || !gameConverter) throw new Error('No converter');
    const matchdayRef = doc(collection(db, 'matchdays')).withConverter(matchdayConverter);
    const matchday = { ...Matchday.create(league), id: matchdayRef.id } as Matchday;

    const batch = writeBatch(db);
    matchday.games = matchday.games.map((game) => {
      const gameRef = doc(collection(db, 'games')).withConverter(gameConverter);
      const newGame = { ...game, id: gameRef.id };
      batch.set(gameRef, newGame);
      return newGame;
    });
    batch.set(matchdayRef, matchday);
    await batch.commit();

    return matchdayRef.id;
  }, [gameConverter, matchdayConverter]);

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
    batch.set(gameRef, newGame);
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
  const [values, loading, error] = useMatchdays();

  const value = values ? values.reduce((acc, m) => {
    const unfinishedGames = m.games.filter((g) => !Game.isFinished(g));
    return acc.concat(unfinishedGames);
  }, [] as Game[]) : undefined;

  return [value, loading, error] as [Game[] | undefined, boolean, Error];
}

export function useGame(id?: string) {
  const converter = useGameConverter();
  const ref = id && converter ? doc(db, 'games', id).withConverter(converter) : null;
  const [value, loading, error] = useDocumentData<Game>(ref);
  useEffect(() => { if (error) throw error; }, [error]);

  return [value, loading, error] as [Game | undefined, boolean, Error];
}
