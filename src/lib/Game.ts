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
  // TODO: doppel?
  // TODO: raceTo
  // TODO: start/end?
  state: State
}

export namespace Game {
  export function isFinished(game: Game): boolean {
    // TODO: implement
    return false;
  }
  export function getWinner(game: Game): 'home' | 'guest' | undefined {
    // TODO: implement
    return undefined;
  }
}
