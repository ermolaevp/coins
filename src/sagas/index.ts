import { delay } from 'redux-saga';
import { call, put, take, takeEvery, fork, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../api';
import * as selectors from '../selectors';

export function *fetchQuotes() {
  const quotes = yield call(api.fetchQuotes);
  yield put(actions.receiveQuotes(quotes));
}

export function *fetchMarkets() {
  yield put(actions.requestMarkets());
  const quote = yield select(selectors.marketsQuote);
  const pairs = yield call(api.fetchAssetPairs, quote);
  const markets = yield call(api.fetchMarkets, pairs);
  yield put(actions.receiveMarkets(markets));
}

export function *watchMarketsQuote() {
  while (true) {
    const prevQuote = yield select(selectors.marketsQuote);
    yield take(actions.marketsSetQuote);
    const nextQuote = yield select(selectors.marketsQuote);
    if (prevQuote !== nextQuote) {
      yield call(fetchMarkets);
    }
  }
}

export function *watchMarkets() {
  while (true) {
    yield call(delay, 3000);
    yield call(fetchMarkets);
  }
}

export function *startup() {
  yield fork(fetchQuotes);
  yield fork(fetchMarkets);
  if (process.env.TARGET === 'browser') {
    yield fork(watchMarketsQuote);
    yield fork(watchMarkets);
  }
}

export default function* root() {
  yield fork(startup);
}
