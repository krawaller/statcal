import { actionTypes } from '../../constants';
import { initialState } from '../initialstate';

export const msgReducer = (currentState, action) => {
  switch(action.type){
    case actionTypes.SHOW_SUCCESS_MSG: return currentState.concat({msg:action.message,type: 'success'});
    case actionTypes.SHOW_ERROR_MSG: return currentState.concat({msg:action.message,type: 'error'});
    case actionTypes.DISMISS_MSG: return currentState.filter((msg,n)=> n !== action.num);
    default: return currentState || initialState.msg;
  }
}
