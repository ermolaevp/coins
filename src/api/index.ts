const production = process.env.NODE_ENV === "production";

const toJSON = (resp: any) => resp.json();

function toFloat(x: string, d = 4) {
  return Number.parseFloat(x).toFixed(d);
}

const filterPairsByQuote = (quote: string) => ({ result }: any) => {
  const pairs: string[] = [];
  for (const pair in result) {
    if (result.hasOwnProperty(pair) && result[pair].quote === quote) {
      pairs.push(pair);
    }
  }
  return pairs;
};

function normalizeMarketsResult({ result }: any) {
  const r: any = {};
  for (const pair in result) {
    if (result.hasOwnProperty(pair)) {
      r[pair] = {
        price: toFloat(result[pair].a[0]),
        averagePrice: toFloat(result[pair].p[1]),
        volumeToday: toFloat(result[pair].v[0]),
        tradesToday: result[pair].t[0]
      };
    }
  }
  return r;
}

function uniqueQuotes({ result }: any) {
  const quotes: string[] = [];
  for (const pair in result) {
    if (result.hasOwnProperty(pair)) {
      if (quotes.indexOf(result[pair].quote) === -1) {
        quotes.push(result[pair].quote);
      }
    }
  }
  return quotes.sort().reverse();
}

const toURL = (path: string) => {
  if (production) {
    return "https://coins.11coders.com" + path;
  }
  return path;
};

export function fetchMarkets(pairs: string[]) {
  return fetch(toURL(`/0/public/Ticker?pair=${pairs.join(",")}`))
    .then(toJSON)
    .then(normalizeMarketsResult);
}

export function fetchAssetPairs(quote: string = "ZUSD") {
  return fetch(toURL("/0/public/AssetPairs"))
    .then(toJSON)
    .then(filterPairsByQuote(quote));
}

export function fetchQuotes() {
  return fetch(toURL("/0/public/AssetPairs"))
    .then(toJSON)
    .then(uniqueQuotes);
}
