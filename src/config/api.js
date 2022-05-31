export const CoinList = (currency, page, sort, period) => {
  console.log(period)
 return  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sort}&per_page=30&page=${page}&sparkline=true&price_change_percentage=${period}`;
}

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;