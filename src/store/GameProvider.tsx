import {
  createContext, ReactNode, useCallback, useContext, useMemo, useState,
} from 'react';
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
  const [mode, setMode] = useState<Mode>(Mode.Ball8);
  const [state, setState] = useState<State>(getInitialState(mode));

  const startNewGame = useCallback((newMode: Mode) => {
    setMode(newMode);
    setState(getInitialState(newMode));
  }, []);

  const updateState = useCallback((action: Action) => {
    const newState = reducer(mode, state, action);
    setState(newState);
  }, [mode, state, setState]);

  const value = useMemo(() => ({
    mode, state, startNewGame, updateState,
  }), [mode, state, startNewGame, updateState]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
