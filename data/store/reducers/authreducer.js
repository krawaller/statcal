import { actionTypes, authStates } from '../../constants';
import { initialState } from '../initialstate';

export const authReducer = (currentState, action) => {
  switch(action.type){
    case actionTypes.START_AUTH_LISTEN: return {
      ...currentState,
      authListening: true
    }
    case actionTypes.ATTEMPTING_LOGIN: return {
      ...currentState,
      status: authStates.AWAITING_REPONSE
    }
    case actionTypes.LOGIN: return {
      ...currentState, 
      user: action.authData.user,
      token: action.authData.token,
      uid: action.authData.uid,
      status: authStates.LOGGED_IN
    };
    case actionTypes.LOGOUT: return {
      ...currentState,
      user: null,
      uid: null,
      token: null,
      status: authStates.LOGGED_OUT
    }
    default: return currentState || initialState.auth;
  }
};
