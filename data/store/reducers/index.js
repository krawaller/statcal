import { combineReducers } from 'redux';

import { authReducer } from './authreducer';
import { msgReducer } from './msgreducer';
import { dataReducer } from './datareducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  msg: msgReducer,
  data: dataReducer
});
