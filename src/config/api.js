export const CoinList = () => 
`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;

export const SingleCoin = (id) =>
`https://api.coingecko.com/api/v3/coins/${id}`;