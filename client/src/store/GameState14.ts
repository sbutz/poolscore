type NumberOfBalls = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export const BALLS : Array<NumberOfBalls> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

interface Run {
  balls: number;
  fouls: number;
}
const initialRun = {
  balls: 0,
  fouls: 0,
};

export interface PlayerState {
  runs: Array<Run>;
  score: number;
  highestScore: number;
  averageScore: number;
  fouls: number;
}
const initialPlayerState = {
  runs: [],
  score: 0,
  highestScore: 0,
  averageScore: 0,
  fouls: 0,
};

interface State {
  actions: Action[];
  activePlayer: undefined | 'home' | 'guest';
  remainingBalls: number;
  home: PlayerState,
  guest: PlayerState,
}
export const initialState : State = {
  actions: [],
  activePlayer: undefined,
  remainingBalls: 15,
  home: { ...initialPlayerState },
  guest: { ...initialPlayerState },
};

interface SetActivePlayerAction {
  type: 'SET_ACTIVE_PLAYER';
  player: 'home' | 'guest';
}

interface SetRemainingBallsAction {
  type: 'SET_REMAINING_BALLS';
  balls: NumberOfBalls;
}

interface BreakFoulAction {
  type: 'BREAK_FOUL';
}

interface FoulAction {
  type: 'FOUL';
}

interface RollbackAction {
  type: 'ROLLBACK';
}

interface ResetAction {
  type: 'RESET';
}

type Action = SetActivePlayerAction
| SetRemainingBallsAction
| BreakFoulAction
| FoulAction
| RollbackAction
| ResetAction;

function calculatePlayerState(runs: Array<Run>) : PlayerState {
  if (runs.length === 0) return { ...initialPlayerState };

  const score = runs.reduce((acc, r) => acc + r.balls - r.fouls, 0);
  const highestScore = runs.reduce(
    (acc, r) => Math.max(acc, r.balls - r.fouls),
    Number.NEGATIVE_INFINITY,
  );
  const averageScore = score / runs.length;
  let fouls = 0;

  fouls = runs.reduce((acc, r) => {
    if (r.fouls % 2 === 1) {
      // reset after 3 fouls or potting a ball
      if (acc === 2 || r.balls > 0) {
        return 1;
      }
      return acc + 1;
    }

    // no foul or 3 fouls
    return 0;
  }, 0);

  return {
    runs,
    score,
    highestScore,
    averageScore,
    fouls,
  };
}

export function isFoulPossible(state: State) {
  if (!state.activePlayer) return false;

  const { runs } = state[state.activePlayer];
  const lastRun = { ...runs[runs.length - 1] };

  return lastRun.fouls % 2 === 0;
}

export function isBreakFoulPossible(state: State) {
  // Break foul situations:
  // 1. on break: first run, balls = 15, fouls = 2*i
  // 2. after 3 fouls: balls = 15, fouls = 16+2*i

  if (!state.activePlayer) return false;

  const { runs } = state[state.activePlayer];
  const lastRun = runs[runs.length - 1];

  return state.remainingBalls === 15
    && lastRun.fouls % 2 === 0
    && (state.home.runs.length + state.guest.runs.length === 1 || lastRun.fouls >= 16);
}

export function reducer(state: State, action: Action) : State {
  switch (action.type) {
    case 'SET_ACTIVE_PLAYER': {
      if (state.activePlayer === action.player) throw Error(`It's already players ${action.player}'s turn.`);

      const currentPlayer = state.activePlayer;
      const runs = [...state[action.player].runs, { ...initialRun }];

      const newState = {
        ...state,
        actions: [...state.actions, action],
        activePlayer: action.player,
        [action.player]: {
          ...calculatePlayerState(state[action.player].runs),
          runs,
        },
      };

      if (currentPlayer !== undefined) {
        newState[currentPlayer] = calculatePlayerState(state[currentPlayer].runs);
      }

      return newState;
    }
    case 'SET_REMAINING_BALLS': {
      if (!state.activePlayer) throw Error('Starting player is not set.');

      let { runs } = state[state.activePlayer];
      const lastRun = { ...runs[runs.length - 1] };

      const diff = state.remainingBalls - action.balls;
      if (diff < 0) throw Error('Remaining balls must be less than last time.');

      lastRun.balls += diff;
      runs = [...runs.slice(0, -1), lastRun];

      const remainingBalls = action.balls === 0 || action.balls === 1 ? 15 : action.balls;

      return {
        ...state,
        actions: [...state.actions, action],
        remainingBalls,
        [state.activePlayer]: calculatePlayerState(runs),
      };
    }
    case 'BREAK_FOUL': {
      if (!state.activePlayer) throw Error('Starting player is not set.');
      if (!isBreakFoulPossible(state)) throw Error('Break foul can only occur on break or after 3 fouls.');

      let { runs } = state[state.activePlayer];
      const lastRun = { ...runs[runs.length - 1] };
      lastRun.fouls += 2;
      runs = [...runs.slice(0, -1), lastRun];

      return {
        ...state,
        actions: [...state.actions, action],
        [state.activePlayer]: calculatePlayerState(runs),
      };
    }
    case 'FOUL': {
      if (!state.activePlayer) throw Error('Starting player is not set.');
      if (!isFoulPossible(state)) throw Error('Only one standard foul per run can be commited.');

      let { runs } = state[state.activePlayer];
      const lastRun = { ...runs[runs.length - 1] };
      lastRun.fouls += 1;
      runs = [...runs.slice(0, -1), lastRun];

      // Severe foul
      let { remainingBalls } = state;
      if (state[state.activePlayer].fouls === 2) {
        remainingBalls = 15;
        lastRun.fouls += 15;
      }

      return {
        ...state,
        actions: [...state.actions, action],
        remainingBalls,
        [state.activePlayer]: calculatePlayerState(runs),
      };
    }
    case 'ROLLBACK': {
      return state.actions.slice(0, -1).reduce((acc, a) => reducer(acc, a), initialState);
    }
    case 'RESET': {
      return initialState;
    }
    // no default
  }
}
