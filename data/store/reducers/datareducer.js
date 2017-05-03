import { actionTypes, authStates } from '../../constants';
import { initialState } from '../initialstate';

export const dataReducer = (currentState, action) => {
  switch(action.type){
    case actionTypes.RECEIVE_DATA: return {
      ...currentState,
      fromServer: action.data
    };
    default: return currentState || initialState.data;
  }
}
