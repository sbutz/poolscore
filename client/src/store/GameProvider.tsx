import {
  createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  collection, doc, query, where, updateDoc, limit,
} from 'firebase/firestore';
import { useAuth } from './AuthProvider';
import { db } from './Firebase';
import {
  Mode, State, Action, getInitialState, reducer,
} from './GameModes';

interface GameState {
  mode?: Mode;
  state: State;
  startNewGame: (mode: Mode) => void;
  updateState: (action: Action) => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

export function useGame() {
  const value = useContext(GameContext);
  if (value === undefined) throw new Error('Expected games context value to be set.');
  return value;
}

interface GameProviderProps {
  children: ReactNode;
}
export default function GameProvider({ children }: GameProviderProps) {
  const { clubId, tableId } = useAuth();
  const [mode, setMode] = useState<Mode>(Mode.Ball8);
  const [state, setState] = useState<State>(getInitialState(mode));

  const clubRef = clubId ? doc(db, `clubs/${clubId}`) : null;
  const tableRef = clubId && tableId ? doc(db, `clubs/${clubId}/tables/${tableId}`) : null;
  const q = clubRef && tableRef
    ? query(collection(db, 'games'), where('club', '==', clubRef), where('table', '==', tableRef), limit(1))
    : null;
  const [gameData, gameDataLoading, gameDataError, snapshot] = useCollectionData(q);
  const gameRef = snapshot ? snapshot.docs[0].ref : null;
  useEffect(() => { if (gameDataError) throw gameDataError; }, [gameDataError]);

  // Sync behaviour:
  // - no online state available
  //   - just use local state
  //   - start new game
  // - online state available
  //   - local changes -> push to firestore
  //   - changes in firestore (e.g. from other client) -> apply to local
  const onlineSync = gameRef && !gameDataError && !gameDataLoading
    && gameData?.at(0) && gameData.at(0)?.mode;
  useEffect(() => {
    if (onlineSync) {
      setMode(gameData?.at(0)?.mode);
      setState(gameData?.at(0)?.state);
    }
  }, [gameData, onlineSync]);

  const startNewGame = useCallback(async (newMode: Mode) => {
    setMode(newMode);
    setState(getInitialState(newMode));
    if (onlineSync) {
      await updateDoc(gameRef, { mode: newMode, state: getInitialState(newMode) });
    }
  }, [gameRef, onlineSync]);

  const updateState = useCallback(async (action: Action) => {
    const newState = reducer(mode, state, action);
    setState(newState);
    if (onlineSync) {
      await updateDoc(gameRef, { state: newState });
    }
  }, [mode, state, setState, gameRef, onlineSync]);

  const value = useMemo(() => ({
    mode, state, startNewGame, updateState,
  }), [mode, state, startNewGame, updateState]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
