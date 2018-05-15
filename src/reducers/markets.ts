import {
  REQUEST_MARKETS,
  RECEIVE_MARKETS,
  MARKETS_NEXT_PAGE,
  MARKETS_PREV_PAGE,
  MARKETS_SET_PAGE,
  MARKETS_SET_QUOTE,
} from '../actions';

export default function(
  state: any = {
    isFetching: false,
    lastUpdated: null,
    items: {},
    currentPage: 0,
    rowsPerPage: 25,
    quote: 'ZUSD',
  },
  action: any,
) {
  if (action.type === REQUEST_MARKETS) {
    return {
      ...state,
      isFetching: true,
    };
  }
  if (action.type === RECEIVE_MARKETS) {
    return {
      ...state,
      items: action.payload,
      isFetching: false,
      lastUpdated: action.receivedAt,
    };
  }
  if (action.type === MARKETS_NEXT_PAGE) {
    const nextPage = state.currentPage + 1;
    return {
      ...state,
      currentPage: nextPage,
    };
  }
  if (action.type === MARKETS_PREV_PAGE) {
    const prevPage = state.currentPage - 1;
    return {
      ...state,
      currentPage: prevPage,
    };
  }
  if (action.type === MARKETS_SET_PAGE) {
    return {
      ...state,
      currentPage: action.payload,
    };
  }
  if (action.type === MARKETS_SET_QUOTE) {
    return {
      ...state,
      quote: action.payload,
    };
  }
  return state;
}
