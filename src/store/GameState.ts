interface State {
  actions: Action[];
  scoreHome: number;
  scoreGuest: number;
}
const initialState = {
  actions: [] as Action[],
  scoreHome: 0,
  scoreGuest: 0,
};

interface Action {
  type: 'HOME_PLUS_ONE'
  | 'HOME_MINUS_ONE'
  | 'GUEST_PLUS_ONE'
  | 'GUEST_MINUS_ONE'
  | 'ROLLBACK'
  | 'RESET';
}

// eslint-disable-next-line consistent-return
function reducer(state: State, action: Action) : State {
  const actions = [...state.actions, action];

  switch (action.type) {
    case 'HOME_PLUS_ONE':
      return { ...state, actions, scoreHome: state.scoreHome + 1 };
    case 'HOME_MINUS_ONE':
      return { ...state, actions, scoreHome: Math.max(0, state.scoreHome - 1) };
    case 'GUEST_PLUS_ONE':
      return { ...state, actions, scoreGuest: state.scoreGuest + 1 };
    case 'GUEST_MINUS_ONE':
      return { ...state, actions, scoreGuest: Math.max(0, state.scoreGuest - 1) };
    case 'ROLLBACK':
      return state.actions.slice(0, -1).reduce((acc, a) => reducer(acc, a), initialState);
    case 'RESET':
      return initialState;
    // no default
  }
}

export { reducer, initialState };
