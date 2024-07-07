import {
  State as State8, Action as Action8, initialState as initial8State, reducer as reducer8,
} from './GameState';
import {
  State as State14, Action as Action14, initialState as initial14state, reducer as reducer14,
} from './GameState14';

export enum Mode {
  Ball8 = 'BALL8',
  Straight = 'STRAIGHT',
}

export namespace Mode {
  export function toString(mode: Mode) {
    const names = {
      [Mode.Ball8]: '8-Ball',
      [Mode.Straight]: '14/1 endlos',
    };
    return names[mode];
  }
}

export type State = State8 | State14;

export type Action = Action8 | Action14;

export const getInitialState = (mode: Mode) => {
  const initialStates = {
    [Mode.Ball8]: initial8State,
    [Mode.Straight]: initial14state,
  };
  return initialStates[mode];
};

export const reducer = (mode: Mode, state: State, action: Action) => {
  const nextState = {
    [Mode.Ball8]: () => reducer8(state as State8, action as Action8),
    [Mode.Straight]: () => reducer14(state as State14, action as Action14),
  };
  return nextState[mode]();
};
