import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

export default function(reducers: any, initalState: any = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const enhancers: any = [];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV !== 'production') {
    composeEnhancers = composeWithDevTools({
      // Specify name here, actionsBlacklist, actionsCreators and other options if needed
    });
  }

  const store = createStore(
    reducers,
    initalState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );

  return {
    ...store,
    runSaga: sagaMiddleware.run,
  };
}
