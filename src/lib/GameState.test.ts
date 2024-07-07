import { initialState, reducer } from './GameState';

describe('initial state', () => {
  it('should init with 0-0', () => {
    expect(initialState.home.score).toBe(0);
    expect(initialState.guest.score).toBe(0);
  });
});

describe('reducer', () => {
  it('should increase score', () => {
    let state = initialState;

    for (let i = 0; i < 10; i += 1) {
      state = reducer(state, { type: 'HOME_PLUS_ONE' });
      expect(state.home.score).toBe(i + 1);
    }

    for (let i = 0; i < 10; i += 1) {
      state = reducer(state, { type: 'GUEST_PLUS_ONE' });
      expect(state.guest.score).toBe(i + 1);
    }
  });
  it('should decrease score', () => {
    let state = { ...initialState, guest: { score: 10 }, home: { score: 10 } };

    for (let i = 10; i > 0; i -= 1) {
      state = reducer(state, { type: 'HOME_MINUS_ONE' });
      expect(state.home.score).toBe(i - 1);
    }

    for (let i = 10; i > 0; i -= 1) {
      state = reducer(state, { type: 'GUEST_MINUS_ONE' });
      expect(state.guest.score).toBe(i - 1);
    }
  });
  it('should reset to initial state', () => {
    let state = { ...initialState, home: { score: 7 }, guest: { score: 3 } };
    state = reducer(state, { type: 'RESET' });
    expect(state).toBe(initialState);
  });
  it('should rollback single actions', () => {
    let state = initialState;
    for (let i = 0; i < 7; i += 1) {
      state = reducer(state, { type: 'HOME_PLUS_ONE' });
    }
    expect(state.home.score).toBe(7);
    for (let i = 0; i < 3; i += 1) {
      state = reducer(state, { type: 'GUEST_PLUS_ONE' });
    }
    expect(state.guest.score).toBe(3);
    for (let i = 0; i < 4; i += 1) {
      state = reducer(state, { type: 'ROLLBACK' });
    }
    expect(state.home.score).toBe(6);
    expect(state.guest.score).toBe(0);
  });
});
