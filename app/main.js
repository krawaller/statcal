import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import {store, actions} from '../data';
import {App} from './src/app';

actions.startListeningToAuth();

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
