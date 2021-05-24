import appReducer, { initialState } from '../Redux/reducer';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(appReducer(initialState, {})).toEqual(expectedResult);
  });

  it('should handle loading state of reducer', () => {
    const expectedResult = {
      ...state,
      loading: true,
      data: [],
      totalCount: 0,
      error: null,
    };
    expect(appReducer(state, {
      type: 'LOAD_DATA',
      payload: true
    })).toEqual(expectedResult);
  });

});
