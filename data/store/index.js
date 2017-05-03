import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import { rootReducer } from './reducers';
import { initialState } from './initialstate';

// A super-simple logger
const logger = store => next => action => {
  console.log('dispatching', action.type,action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

export const store = applyMiddleware(thunk,logger)(createStore)(rootReducer,initialState);
