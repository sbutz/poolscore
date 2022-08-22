interface State {
    score_home: number;
    score_guest: number;
    history: Array<Object>;
}
const initialState : State = {
  score_home: 0,
  score_guest: 0,
  history: [],
};

interface Action {
    type: 'home_plus_one' | 'home_minus_one' | 'guest_plus_one' |
      'guest_minus_one' | 'rollback_score' | 'reset_score';
}
const reducer = (state: State, action: Action) : State => {
  let {history, ...rest} = state;
  history =  [...history, rest]

  switch (action.type) {
    case 'home_plus_one':
      return {...state, history, score_home: state.score_home+1};
    case 'home_minus_one':
      return {...state, history, score_home: Math.max(0, state.score_home-1)};
    case 'guest_plus_one':
      return {...state, history, score_guest: state.score_guest+1};
    case 'guest_minus_one':
      return {...state, history, score_guest: Math.max(0, state.score_guest-1)};
    case 'rollback_score':
      return {...state, history: history.slice(0, -2), ...history.at(-2)};
    case 'reset_score':
      return initialState;
    default:
        throw Error(`Unknown action type: ${action.type}`);
  }
};

export { reducer, initialState }