import { Game } from './Game';
import { getInitialState, Mode } from './GameModes';
import { Matchday } from './Matchday';

export const dummyGame : Game = {
  id: '1',
  names: { home: 'Stefan Wimmer', guest: 'Manuel Plattner' },
  mode: Mode.Ball8,
  raceTo: 5,
  state: getInitialState(Mode.Ball8),
};

export const dummyMatchday : Matchday = {
  id: '1',
  names: { home: 'NBay', guest: 'Tirol' },
  games: [dummyGame, dummyGame, dummyGame, dummyGame, dummyGame,
    dummyGame, dummyGame, dummyGame, dummyGame, dummyGame],
};
