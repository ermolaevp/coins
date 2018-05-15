import express from 'express';
import fs from 'fs';
import path from 'path';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import App from './app';
import createStore from './utils/create-store';
import { Provider } from 'react-redux';
import reducers from './reducers';
import sagas from './sagas';

function handleRender(req: any, res: any) {

  const store = createStore(reducers);

  store.runSaga(sagas).done.then(() => {

    const html = renderToString(
      <Provider store={store}>
        <App />
      </Provider>);

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    // Load contents of index.html
    fs.readFile('./index.html', 'utf8', (err, data) => {
      if (err) { throw err; }

      // Inserts the rendered React HTML into our main div
      const document = data.replace(
        /<div id="root"><\/div>/,
        `<div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>`);

      // Sends the response back to the client
      res.send(document);
    });
  });
}

const app = express();

// Serve requests with our handleRender function
app.get('/', handleRender);

// Start server
app.listen(3377);
