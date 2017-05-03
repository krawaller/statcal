import { bindActionCreators } from 'redux';
import { actions as nakedActions } from './actions';

import { store } from './store';

export { firebase } from './firebase';
export { store } from './store';

export const actions = bindActionCreators(nakedActions,store.dispatch);
