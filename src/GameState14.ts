interface Run {
  balls: number;
  foul: boolean;
  points: number;
}
interface State14 {
  playing: undefined | "home" | "guest";
  runs_home: Array<Run>;
  runs_guest: Array<Run>;
  remaining_balls: number;
  history: Array<Object>;
  /* removes logic of score calculation from component */
  score_home: number;
  score_guest: number;
  fouls_home: number;
  fouls_guest: number;
}
const initialState : State14 = {
  playing: undefined,
  runs_home: [],
  runs_guest: [],
  remaining_balls: 15,
  history: [],
  score_home: 0,
  score_guest: 0,
  fouls_home: 0,
  fouls_guest: 0,
};

interface Action14 {
  //TODO: fixed strings
  type: string;
  starting_player?: "home" | "guest";
  remaining_balls?: number;
}
const reducer = (state: State14, action: Action14) : State14 => {
  let {history, ...rest} = state;
  history =  [...history, rest]

  //assert(Math.abs(state.runs_home.length - state.runs_guest.length) <= 1);

  switch (action.type) {
    case 'starting_player':
      const new_run = { balls: 0, foul: false, points: 0 };
      return {
        ...state,
        history,
        playing: action.starting_player,
        runs_home: action.starting_player === 'home' ? [new_run] : [],
        runs_guest: action.starting_player === 'guest' ? [new_run] : [],
      };
    case 'remaining_balls':
      if (action.remaining_balls === undefined) {
        throw Error('Remaining balls are not provided.');
      } else if (action.remaining_balls > state.remaining_balls) {
        throw Error('Remaining balls must be less than last time.');
      } else if (!state.playing) {
        throw Error('Starting player is not set.');
      } else {
        const balls = state.remaining_balls - action.remaining_balls;
        const remaining_balls = action.remaining_balls === 1 ?
          15 : action.remaining_balls;
        const playing = action.remaining_balls === 1 ?
          state.playing : (state.playing === 'home' ? 'guest' : 'home');

        const update_active_runs = (runs: Run[]) => {
          const last = runs.at(-1)!;
          const active = {
            ...last,
            balls: last.balls + balls,
            points: last.points + balls,
          };
          return [...runs.slice(0, -1), active];
        }

        const update_passive_runs = (runs: Run[]) => {
          return state.playing === playing ?
            runs : [...runs, { balls: 0, foul: false, points: 0 }];
        }

        let runs_home, runs_guest;
        let fouls_home = state.fouls_home;
        let fouls_guest = state.fouls_guest;
        if (state.playing === 'home') {
          runs_home = update_active_runs(state.runs_home);
          fouls_home = runs_home.at(-1)?.foul ? state.fouls_home : 0;
          runs_guest = update_passive_runs(state.runs_guest);
        } else {
          runs_home = update_passive_runs(state.runs_home);
          runs_guest = update_active_runs(state.runs_guest);
          fouls_guest = runs_guest.at(-1)?.foul ? state.fouls_guest : 0;
        }

        return {
          ...state,
          history,
          playing,
          runs_home,
          runs_guest,
          remaining_balls,
          score_home: runs_home.reduce((acc, e) => acc + e.points, 0),
          score_guest: runs_guest.reduce((acc, e) => acc + e.points, 0),
          fouls_home,
          fouls_guest,
        };
      }
    case 'foul':
      //XXX: pressing foul if its not the players turn?
      //XXX: requires attribute on action
      //XXX: or all actions with player attribute and filter in game view
      if (!state.playing) {
        throw Error('Starting player is not set.');
      } else {
        let remaining_balls = state.remaining_balls;

        const isBreak = (state.runs_home.length + state.runs_guest.length) === 1; 

        const update_runs2 = (active: Run[], passive: Run[]) => {
          const last = active.at(-1)!;
          const current = { ...last, foul: true};
          if (isBreak)
            current.points -= 2;
          else
            current.points -= 1;

          // break foul does not count to 3-fouls
          // rack with 15 balls
          // current player performs new break
          if (active.length >= 4 && active.at(-2)?.foul && active.at(-3)?.foul) {
            current.points -= 15;
            remaining_balls = 15;
          }

          return [[...active.slice(0, -1), current], passive];
        }

        let runs_home, runs_guest;
        let fouls_home = state.fouls_home;
        let fouls_guest = state.fouls_guest;
        if (state.playing === 'home') {
          [runs_home, runs_guest] = update_runs2(state.runs_home, state.runs_guest);
          fouls_home = isBreak ? 0 : fouls_home + 1;
        } else {
          [runs_guest, runs_home] = update_runs2(state.runs_guest, state.runs_home);
          fouls_guest = isBreak ? 0 : fouls_guest + 1;
        }

        return {
          ...state,
          history,
          remaining_balls,
          runs_home,
          runs_guest,
          score_home: runs_home.reduce((acc, e) => acc + e.points, 0),
          score_guest: runs_guest.reduce((acc, e) => acc + e.points, 0),
          fouls_home,
          fouls_guest,
        };
      }
    case 'rollback':
      return {...state, history: history.slice(0, -2), ...history.at(-2)};
    case 'reset':
      return initialState;
    default:
        throw Error(`Unknown action type: ${action.type}`);
  }
};

export { reducer, initialState };