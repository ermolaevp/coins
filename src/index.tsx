import * as React from 'react';
import * as ReactDOM from 'react-dom';
import createStore from './utils/create-store';
import { Provider } from 'react-redux';
import reducers from './reducers';
import sagas from './sagas';
import App from './app';

// Grab the state from a global variable injected into the server-generated HTML
const { __PRELOADED_STATE__ = {} } = window as any;

const store = createStore(reducers, __PRELOADED_STATE__);

store.runSaga(sagas);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
