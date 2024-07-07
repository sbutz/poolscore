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
  state: State
}
