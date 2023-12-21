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

export type State = State8 | State14;

export type Action = Action8 | Action14;

export const getInitialState = (mode: Mode) => {
  switch (mode) {
    case Mode.Ball8: return initial8State;
    case Mode.Straight: return initial14state;
    default: throw Error(`Unkown Mode '${mode}'`);
  }
};

export const reducer = (mode: Mode, state: State, action: Action) => {
  switch (mode) {
    case Mode.Ball8: return reducer8(state as State8, action as Action8);
    case Mode.Straight: return reducer14(state as State14, action as Action14);
    default: throw Error(`Unkown Mode '${mode}'`);
  }
};
