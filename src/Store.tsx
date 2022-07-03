import React, { createContext, Dispatch, useReducer } from 'react';

interface State {
    score_home: number;
    score_guest: number;
}
//XXX: only 8/9/10 Ball for now
const initialState : State = {
  score_home: 0,
  score_guest: 0,
};

interface Action {
    type: string;
}
const reducer = (state: State, action: Action) : State => {
  switch (action.type) {
    case 'home_plus_one':
      return { ...state,  score_home: state.score_home+1};
    case 'home_minus_one':
      return { ...state,  score_home: Math.max(0, state.score_home-1)};
    case 'guest_plus_one':
      return { ...state,  score_guest: state.score_guest+1};
    case 'guest_minus_one':
      return { ...state,  score_guest: Math.max(0, state.score_guest-1)};
    case 'reset_score':
      return {...state, score_guest: 0, score_home: 0};
    default:
        throw Error(`Unknown action type: ${action.type}`);
  }
};

const Context = createContext<[State,Dispatch<Action>?]>([initialState]);

interface StoreProps {
    children: React.ReactNode;
}
function Store({children} : StoreProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
      <Context.Provider value={[state, dispatch]}>
          {children}
      </Context.Provider>
  );
}

export { Store, Context };