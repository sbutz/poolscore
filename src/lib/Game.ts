import { Mode, State } from './GameModes';

export const defaultPlayerNames : PlayerNames = {
  home: 'Heim',
  guest: 'Gast',
};

export interface PlayerNames {
  home: string;
  guest: string;
}

export interface Game {
  id: string;
  names: PlayerNames
  mode: Mode;
  raceTo: number;
  state: State
}

export namespace Game {
  export function isFinished(game: Game): boolean {
    return Game.getWinner(game) !== undefined;
  }

  export function getWinner(game: Game): 'home' | 'guest' | undefined {
    if (game.state.home.score === game.raceTo) return 'home';
    if (game.state.guest.score === game.raceTo) return 'guest';
  }
}
