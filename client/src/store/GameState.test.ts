import { initialState, reducer } from './GameState';

describe('initial state', () => {
  it('should init with 0-0', () => {
    expect(initialState.scoreHome).toBe(0);
    expect(initialState.scoreGuest).toBe(0);
  });
});

describe('reducer', () => {
  it('should increase score', () => {
    let state = initialState;

    for (let i = 0; i < 10; i += 1) {
      state = reducer(state, { type: 'HOME_PLUS_ONE' });
      expect(state.scoreHome).toBe(i + 1);
    }

    for (let i = 0; i < 10; i += 1) {
      state = reducer(state, { type: 'GUEST_PLUS_ONE' });
      expect(state.scoreGuest).toBe(i + 1);
    }
  });
  it('should decrease score', () => {
    let state = { ...initialState, scoreGuest: 10, scoreHome: 10 };

    for (let i = 10; i > 0; i -= 1) {
      state = reducer(state, { type: 'HOME_MINUS_ONE' });
      expect(state.scoreHome).toBe(i - 1);
    }

    for (let i = 10; i > 0; i -= 1) {
      state = reducer(state, { type: 'GUEST_MINUS_ONE' });
      expect(state.scoreGuest).toBe(i - 1);
    }
  });
  it('should reset to initial state', () => {
    let state = { ...initialState, scoreHome: 7, scoreGuest: 3 };
    state = reducer(state, { type: 'RESET' });
    expect(state).toBe(initialState);
  });
  it('should rollback single actions', () => {
    let state = initialState;
    for (let i = 0; i < 7; i += 1) {
      state = reducer(state, { type: 'HOME_PLUS_ONE' });
    }
    expect(state.scoreHome).toBe(7);
    for (let i = 0; i < 3; i += 1) {
      state = reducer(state, { type: 'GUEST_PLUS_ONE' });
    }
    expect(state.scoreGuest).toBe(3);
    for (let i = 0; i < 4; i += 1) {
      state = reducer(state, { type: 'ROLLBACK' });
    }
    expect(state.scoreHome).toBe(6);
    expect(state.scoreGuest).toBe(0);
  });
});
