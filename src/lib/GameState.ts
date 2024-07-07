interface PlayerState {
  score: number;
}

const initialPlayerState = { score: 0 };

export interface State {
  actions: Action[];
  home: PlayerState;
  guest: PlayerState;
}
const initialState = {
  actions: [] as Action[],
  home: { ...initialPlayerState },
  guest: { ...initialPlayerState },
};

export interface Action {
  type: 'HOME_PLUS_ONE'
  | 'HOME_MINUS_ONE'
  | 'GUEST_PLUS_ONE'
  | 'GUEST_MINUS_ONE'
  | 'ROLLBACK'
  | 'RESET';
}

function reducer(state: State, action: Action) : State {
  const actions = [...state.actions, action];

  switch (action.type) {
    case 'HOME_PLUS_ONE':
      return { ...state, actions, home: { score: state.home.score + 1 } };
    case 'HOME_MINUS_ONE':
      return { ...state, actions, home: { score: Math.max(0, state.home.score - 1) } };
    case 'GUEST_PLUS_ONE':
      return { ...state, actions, guest: { score: state.guest.score + 1 } };
    case 'GUEST_MINUS_ONE':
      return { ...state, actions, guest: { score: Math.max(0, state.guest.score - 1) } };
    case 'ROLLBACK':
      return state.actions.slice(0, -1).reduce((acc, a) => reducer(acc, a), initialState);
    case 'RESET':
      return initialState;
    // no default
  }
}

export { reducer, initialState };
