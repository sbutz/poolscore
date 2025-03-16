import {
  initialState, isBreakFoulPossible, isFoulPossible, reducer,
} from './GameState14';

describe('initial state', () => {
  it('should init with 0-0', () => {
    expect(initialState.home.score).toBe(0);
    expect(initialState.home.highestScore).toBe(0);
    expect(initialState.home.averageScore).toBe(0);
    expect(initialState.home.fouls).toBe(0);
    expect(initialState.guest.score).toBe(0);
    expect(initialState.guest.highestScore).toBe(0);
    expect(initialState.guest.averageScore).toBe(0);
    expect(initialState.guest.fouls).toBe(0);
  });
  it('should init 15 balls remaining', () => {
    expect(initialState.remainingBalls).toBe(15);
  });
  it('should init with no player active', () => {
    expect(initialState.activePlayer).toBeUndefined();
  });
});

describe('is foul possible', () => {
  it('requires active player to be set', () => {
    expect(isFoulPossible(initialState)).toBeFalsy();
  });
  it('should be possible on start', () => {
    let state = initialState;
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    expect(isFoulPossible(state)).toBeTruthy();
  });
  it('should not be possible twice in one run', () => {
    let state = initialState;
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    state = reducer(state, { type: 'FOUL' });
    expect(isFoulPossible(state)).toBeFalsy();
  });
  it('should be possible in consecutive runs', () => {
    let state = initialState;
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    expect(isFoulPossible(state)).toBeTruthy();
    state = reducer(state, { type: 'FOUL' });
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    expect(isFoulPossible(state)).toBeTruthy();
    state = reducer(state, { type: 'FOUL' });
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    expect(isFoulPossible(state)).toBeTruthy();
    state = reducer(state, { type: 'FOUL' });
  });
});

describe('is break foul possible', () => {
  it('requires active player to be set', () => {
    expect(isBreakFoulPossible(initialState)).toBeFalsy();
  });
  it('should be possible on start', () => {
    let state = initialState;
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    expect(isBreakFoulPossible(state)).toBeTruthy();
  });
  it('should be possible multiple times in one run', () => {
    let state = initialState;
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    for (let i = 0; i < 5; i += 5) {
      state = reducer(state, { type: 'BREAK_FOUL' });
      expect(isBreakFoulPossible(state)).toBeTruthy();
    }
  });
  it('should be possible after three fouls', () => {
    let state = initialState;
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    state = reducer(state, { type: 'FOUL' });
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    state = reducer(state, { type: 'FOUL' });
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    state = reducer(state, { type: 'FOUL' });
    expect(isBreakFoulPossible(state)).toBeTruthy();
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
    expect(isBreakFoulPossible(state)).toBeFalsy();
  });
  it('should not be possible multiple during normal game', () => {
    let state = initialState;
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
    state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
    expect(isBreakFoulPossible(state)).toBeFalsy();
    state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 0 });
    expect(isBreakFoulPossible(state)).toBeFalsy();
  });
});

describe('reducer', () => {
  describe('set active player', () => {
    it('should set starting player', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      expect(state.activePlayer).toBe('home');

      state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      expect(state.activePlayer).toBe('guest');
    });

    it('should not set active player to current player', () => {
      expect(() => {
        let state = initialState;
        state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
        reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      }).toThrowError();
    });
    it('should not be able to perform other actions before setting player', () => {
      expect(() => {
        reducer(initialState, { type: 'SET_REMAINING_BALLS', balls: 7 });
      }).toThrowError();
      expect(() => {
        reducer(initialState, { type: 'BREAK_FOUL' });
      }).toThrowError();
      expect(() => {
        reducer(initialState, { type: 'FOUL' });
      }).toThrowError();
    });
  });
  describe('set remaining balls', () => {
    it('should add potted balls to score', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 7 });
      expect(state.home.score).toBe(8);
    });
    it('should add 14 balls if one remaining', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 1 });
      expect(state.home.score).toBe(14);
      expect(state.remainingBalls).toBe(15);
    });
    it('should add 15 balls if none reamining', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 0 });
      expect(state.home.score).toBe(15);
      expect(state.remainingBalls).toBe(15);
    });
    it('should calculate score over multiple racks', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 1 });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 1 });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 7 });
      expect(state.home.score).toBe(14 + 14 + 8);
      expect(state.home.highestScore).toBe(14 + 14 + 8);
      expect(state.home.averageScore).toBe(14 + 14 + 8);
    });
    it('should calculate score over mutliple run', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 14 });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 1 });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 7 });
      expect(state.home.score).toBe(1 + 13 + 8);
      expect(state.home.highestScore).toBe(13 + 8);
      expect(state.home.averageScore).toBe((1 + 13 + 8) / 2);
    });
    it('should not allow to add more balls', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 3 });
      expect(() => {
        reducer(state, { type: 'SET_REMAINING_BALLS', balls: 7 });
      }).toThrowError();
    });
    it('should allow to set remaining balls after foul for better UX', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 13 });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 12 });
      expect(state.remainingBalls).toBe(12);
      expect(state.home.score).toBe(-1 + 3);
      expect(state.home.fouls).toBe(1);
    });
    it('should be possible to score after severe foul', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 12 });
      expect(state.remainingBalls).toBe(12);
      expect(state.home.score).toBe(-18 + 3);
      expect(state.home.fouls).toBe(0);
    });
  });
  describe('foul', () => {
    it('should count as minus one on start', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      expect(state.home.fouls).toBe(1);
      expect(state.home.score).toBe(-1);
    });
    it('should count as minus one during game', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 7 });
      state = reducer(state, { type: 'FOUL' });
      expect(state.home.fouls).toBe(1);
      expect(state.home.score).toBe(7);
    });
    it('should not be possible twice during one run', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      expect(state.home.fouls).toBe(1);
      expect(() => {
        reducer(state, { type: 'FOUL' });
      }).toThrowError();
    });
    it('should reset fouls after potting a ball', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 14 });
      expect(state.home.score).toBe(0);
      expect(state.home.fouls).toBe(0);

      state = reducer(state, { type: 'FOUL' });
      expect(state.home.score).toBe(-1);
      expect(state.home.fouls).toBe(1);
    });
    it('should reset fouls after a run with no foul', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      expect(state.home.score).toBe(-1);
      expect(state.home.fouls).toBe(0);
    });
    it('should punish 3 consecutive fouls', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      expect(state.home.score).toBe(-18);
      expect(state.home.fouls).toBe(0);
      expect(state.remainingBalls).toBe(15);
    });
  });
  describe('break foul', () => {
    it('should each count as -2 but not as foul on start', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      for (let i = 1; i < 5; i += 1) {
        state = reducer(state, { type: 'BREAK_FOUL' });
        expect(state.home.score).toBe(-2 * i);
        expect(state.home.fouls).toBe(0);
      }
    });
    it('should not be possible after break', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      expect(() => {
        reducer(state, { type: 'BREAK_FOUL' });
      }).toThrowError();
    });
    it('should not be possible after potting a ball', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 14 });
      expect(() => {
        reducer(state, { type: 'BREAK_FOUL' });
      }).toThrowError();
    });
    it('should count as -2 but not as foul after 3 fouls', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      expect(state.home.score).toBe(-18);
      expect(state.home.fouls).toBe(0);
      state = reducer(state, { type: 'BREAK_FOUL' });
      expect(state.home.score).toBe(-20);
      expect(state.home.fouls).toBe(0);
    });
  });
  describe('rollback', () => {
    it('should rollback initial state to initial state', () => {
      expect(reducer(initialState, { type: 'ROLLBACK' })).toBe(initialState);
    });
    it('should rollback starting player', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      expect(state.activePlayer).toBe('home');
      state = reducer(state, { type: 'ROLLBACK' });
      expect(state.activePlayer).toBeUndefined();
    });
    it('should rollback potting balls', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 7 });
      expect(state.remainingBalls).toBe(7);
      expect(state.home.score).toBe(8);
      expect(state.home.highestScore).toBe(8);
      expect(state.home.averageScore).toBe(8);
      state = reducer(state, { type: 'ROLLBACK' });
      expect(state.remainingBalls).toBe(15);
      expect(state.home.score).toBe(0);
      expect(state.home.highestScore).toBe(0);
      expect(state.home.averageScore).toBe(0);
    });
    it('should rollback break foul', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'BREAK_FOUL' });
      expect(state.home.score).toBe(-2);
      state = reducer(state, { type: 'ROLLBACK' });
      expect(state.home.score).toBe(0);
    });
    it('should rollback foul', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      expect(state.home.score).toBe(-1);
      expect(state.home.fouls).toBe(1);
      state = reducer(state, { type: 'ROLLBACK' });
      expect(state.home.score).toBe(0);
      expect(state.home.fouls).toBe(0);
    });
    it('should rollback third foul', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 7 });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'guest' });
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'FOUL' });
      expect(state.home.score).toBe(-18);
      expect(state.home.fouls).toBe(0);
      expect(state.remainingBalls).toBe(15);
      state = reducer(state, { type: 'ROLLBACK' });
      expect(state.home.score).toBe(-2);
      expect(state.home.fouls).toBe(2);
      expect(state.remainingBalls).toBe(7);
    });
  });
  describe('reset', () => {
    it('should reset to initial state', () => {
      let state = initialState;
      state = reducer(state, { type: 'SET_ACTIVE_PLAYER', player: 'home' });
      state = reducer(state, { type: 'SET_REMAINING_BALLS', balls: 7 });
      expect(state.remainingBalls).toBe(7);
      expect(state.home.score).toBe(8);
      state = reducer(state, { type: 'RESET' });
      expect(state).toBe(initialState);
    });
  });
});
