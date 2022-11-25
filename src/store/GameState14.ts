interface Run {
  balls: number;
  fouls: number;
}
const initialRun = {
  balls: 0,
  fouls: 0,
};

interface State {
  actions: Action[];

  activePlayer: undefined | "home" | "guest";
  remainingBalls: number;
  runsHome: Array<Run>;
  runsGuest: Array<Run>;

  /* removes logic of score calculation from component */
  scoreHome: number;
  scoreGuest: number;
  foulsHome: number;
  foulsGuest: number;
}
const initialState : State = {
  actions: [],
  activePlayer: undefined,
  remainingBalls: 15,
  runsHome: [],
  runsGuest: [],
  scoreHome: 0,
  scoreGuest: 0,
  foulsHome: 0,
  foulsGuest: 0,
};

interface SetStartingPlayerAction {
  type: 'SET_STARTING_PLAYER';
  player: 'home' | 'guest';
}

interface SetRemainingBallsAction {
  type: 'SET_REMAINING_BALLS';
  balls: number;
}

interface BreakFoulAction {
  type: 'BREAK_FOUL';
  player: 'home' | 'guest';
}

interface FoulAction {
  type: 'FOUL';
  player: 'home' | 'guest';
}

interface RollbackAction {
  type: 'ROLLBACK';
}

interface ResetAction {
  type: 'RESET';
}

type Action = SetStartingPlayerAction
  | SetRemainingBallsAction
  | BreakFoulAction
  | FoulAction
  | RollbackAction
  | ResetAction;

function reducer(state: State, action: Action) : State {
  switch (action.type) {
    case 'SET_STARTING_PLAYER': {
      if (state.activePlayer)
        throw Error('Starting Player already set.');
      if (state.runsHome.length > 0 || state.runsGuest.length > 0)
        throw Error('Runs must be empty.');

      return {
        ...state,
        actions: [...state.actions, action],
        activePlayer: action.player,
        runsHome: action.player === 'home' ? [{ ...initialRun }] : [],
        runsGuest: action.player === 'guest' ? [{ ...initialRun }] : [],
      };
    }
    case 'SET_REMAINING_BALLS': {
      if (!state.activePlayer)
        throw Error('Starting player is not set.');
      if (action.balls < 1 || action.balls > 15)
        throw Error(`Remaing balls must be between 1 and 15 (not ${action.balls}`);

      const diff = state.remainingBalls - action.balls;
      if (diff < 0)
        throw Error('Remaining balls must be less than last time.');
      
      const remainingBalls = action.balls === 1 ?  15 : action.balls;
      const activePlayer = action.balls === 1 ?
        state.activePlayer : (state.activePlayer === 'home' ? 'guest' : 'home');

      /* Update ongoining Run */
      let activeRuns = state.activePlayer === 'home' ? state.runsHome : state.runsGuest;
      let lastRun = activeRuns[activeRuns.length-1];
      lastRun = {
        ...lastRun,
        balls:  lastRun.balls + diff,
      };
      activeRuns = [...activeRuns.slice(0, -1), lastRun];

      /* Init new in case of misshot */
      let passiveRuns = state.activePlayer === 'home' ? state.runsGuest : state.runsHome;
      if (action.balls !== 1)
        passiveRuns = [...passiveRuns, { ...initialRun }];

      const calcScore = (runs: Run[]) : number => {
        return runs.reduce((acc, r) => acc + r.balls - r.fouls, 0);
      };
      const calcFouls = (runs: Run[], previousFouls : number) : number => {
        if (lastRun.fouls > 0)
          if (lastRun.balls > 0)
            return 1;
          else
            return previousFouls;
        else
          return 0;
      };
      
      const runsHome = state.activePlayer === 'home' ? activeRuns : passiveRuns;
      const scoreHome = calcScore(runsHome);
      const foulsHome = state.activePlayer === 'home' ? calcFouls(runsHome, state.foulsHome) : state.foulsHome;
      const runsGuest = state.activePlayer === 'guest' ? activeRuns : passiveRuns;
      const scoreGuest = calcScore(runsGuest);
      const foulsGuest = state.activePlayer === 'guest' ? calcFouls(runsGuest, state.foulsGuest) : state.foulsGuest;

      return {
        ...state,
        actions: [...state.actions, action],
        activePlayer,
        remainingBalls,
        runsHome,
        runsGuest,
        scoreHome,
        scoreGuest,
        foulsHome,
        foulsGuest,
      };
    }
    case 'BREAK_FOUL' : {
      if (!state.activePlayer)
        throw Error('Starting player is not set.');

      let runs = action.player === 'home' ? state.runsHome : state.runsGuest;
      if (runs.length !== 1)
        throw Error('Break foul can only occur on break.');

      return {
        ...state,
        actions: [...state.actions, action],
        runsHome: action.player === 'home' ? [{ fouls: 2, balls: 0}] : state.runsHome,
        runsGuest: action.player === 'guest' ? [{ fouls: 2, balls: 0}] : state.runsGuest,
        scoreHome: action.player === 'home' ? -2 : 0,
        scoreGuest: action.player === 'guest' ? -2 : 0,
        foulsHome: action.player === 'home' ? 0 : state.foulsHome,
        foulsGuest: action.player === 'guest' ? 0 : state.foulsGuest,
      }
    }
    case 'FOUL': {
      if (!state.activePlayer)
        throw Error('Starting player is not set.');

      let fouls = action.player === 'home' ? state.foulsHome : state.foulsGuest;
      let runs = action.player === 'home' ? state.runsHome : state.runsGuest;
      let last = { ...runs[runs.length-1] };
      let remainingBalls = state.remainingBalls;

      if (last.fouls === 1)
        throw Error('Only one foul per run. Except foul on breaking.')

      if (fouls === 2) {
        last.fouls += 16;
        fouls = 0;
        remainingBalls = 15;
      } else {
        last.fouls += 1;
        fouls += 1;
      }

      const runsHome = action.player === 'home' ? [...runs.slice(0, -1), last] : state.runsHome;
      const runsGuest = action.player === 'guest' ? [...runs.slice(0, -1), last] : state.runsGuest;

      return {
        ...state,
        actions: [...state.actions, action],
        remainingBalls,
        runsHome,
        runsGuest,
        scoreHome: runsHome.reduce((acc, r) => acc + r.balls - r.fouls, 0),
        scoreGuest: runsGuest.reduce((acc, r) => acc + r.balls - r.fouls, 0),
        foulsHome: action.player === 'home' ? fouls : state.foulsHome,
        foulsGuest: action.player === 'guest' ? fouls : state.foulsGuest,
      }
    }
    case 'ROLLBACK': {
      return state.actions.slice(0, -1).reduce((acc, a) => reducer(acc, a), initialState);
    }
    case 'RESET': {
      return initialState;
    }
  }
};

export { reducer, initialState };