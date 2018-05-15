export const REQUEST_MARKETS = 'REQUEST_MARKETS';
export const RECEIVE_MARKETS = 'RECEIVE_MARKETS';
export const MARKETS_NEXT_PAGE = 'MARKETS_NEXT_PAGE';
export const MARKETS_PREV_PAGE = 'MARKETS_PREV_PAGE';
export const MARKETS_SET_QUOTE = 'MARKETS_SET_QUOTE';
export const MARKETS_SET_PAGE = 'MARKETS_SET_PAGE';
export const QUOTES_RECEIVE = 'QUOTES_RECEIVE';

export const requestMarkets = () => ({
  type: REQUEST_MARKETS,
});

export const receiveMarkets = (payload: any) => ({
  type: RECEIVE_MARKETS,
  payload,
  receivedAt: Date.now(),
});

export const marketsNextPage = () => ({
  type: MARKETS_NEXT_PAGE,
});

export const marketsPrevPage = () => ({
  type: MARKETS_PREV_PAGE,
});

export const marketsSetQuote = (payload: string) => ({
  type: MARKETS_SET_QUOTE,
  payload,
});

export const marketsSetPage = (payload: number) => ({
  type: MARKETS_SET_PAGE,
  payload,
});

export const receiveQuotes = (payload: string[]) => ({
  type: QUOTES_RECEIVE,
  payload,
});
