import { createStore } from 'redux';
import appReducer, { initialState } from './reducer';

export const store = createStore(appReducer, initialState);