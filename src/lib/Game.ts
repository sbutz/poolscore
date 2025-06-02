import { getInitialState, Mode, State } from './GameModes';

export interface PlayerNames {
  home: string;
  guest: string;
}
export const initialPlayerNames : PlayerNames = {
  home: 'Heim',
  guest: 'Gast',
};

export interface Game {
  id: string;
  names: PlayerNames
  mode: Mode;
  raceTo: number;
  state: State
}
export const initialGame: Game = {
  id: '',
  names: initialPlayerNames,
  mode: Mode.Ball8,
  raceTo: 5,
  state: getInitialState(Mode.Ball8),
};

export namespace Game {
  export function isReady(game: Game): boolean {
    return game.state.actions.length === 0 && !Game.isFinished(game)
      && game.names.home !== '' && game.names.home !== initialPlayerNames.home
      && game.names.guest !== '' && game.names.guest !== initialPlayerNames.guest;
  }

  export function isRunning(game: Game): boolean {
    return game.state.actions.length > 0 && !Game.isFinished(game);
  }

  export function isFinished(game: Game): boolean {
    return Game.getWinner(game) !== undefined;
  }

  export function getWinner(game: Game): 'home' | 'guest' | undefined {
    if (game.state.home.score === game.raceTo) return 'home';
    if (game.state.guest.score === game.raceTo) return 'guest';
  }
}
