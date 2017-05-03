import { authStates } from '../constants';

export const initialState = {
  auth: {
    user: null,
    uid: null,
    token: null,
    status: authStates.LOGGED_OUT,
    authListening: false
  },
  msg: [],
  data: {
    fromServer: null
  }
};