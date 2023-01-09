import axios from 'axios';

const API_KEY_PORTAL = 'ud298u23-ru23-4h82-l79h-2938urh29ury';

const STOCK_DATA =
  'https://query1.finance.yahoo.com/v7/finance/quote?format=json&symbols=';

const CRYPTO_DATA =
  'https://www.binance.us/api/v3/depth?symbol=${symbol}USD&limit=1';

const GOOGLE_NEWS = 'https://news.google.com/';

const GOOGLE_NEWS_BUSINESS =
  GOOGLE_NEWS + 'news/rss/headlines/section/topic/BUSINESS';

const GOOGLE_NEWS_SEARCH = GOOGLE_NEWS + 'rss/search?q=';

export const client = {
  getStockData: async function (symbols: string[]): Promise<any> {
    let url = STOCK_DATA + symbols;

    const axiosConfig = {
      method: 'GET',
      url: `${url}`,
    };
    const response = await axios(axiosConfig);
    console.log(response.data);
    return response.data;
  },
  getCryptoData: async function (): Promise<any> {
    let symbol = 'ETH';
    let url = `https://www.binance.us/api/v3/depth?symbol=${symbol}USD&limit=1`;

    const axiosConfig = {
      method: 'GET',
      url: `${url}`,
    };
    const response = await axios(axiosConfig);
    console.log(response.data);
    return response.data;
  },
};
// client.get = function (symbol, customConfig = {}) {
//   return client(symbol, {...customConfig, method: 'GET'});
// };

// client.post = function (formData, body, customConfig = {}) {
//   return client({...customConfig, formData, body, method: 'POST'});
// };

// client.many = async function (symbols, {formData, body, ...customConfig} = {}) {
//   let headers;

//   let axiosConfigList = [];

//   symbols.forEach(symbol => {
//     let url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?region=US&lang=en-US&includePrePost=false&interval=2m&useYfid=true&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance`;
//     let axiosConfig = {
//       method: customConfig.method,
//       url: `${url}`,
//     };
//     axiosConfigList.push(axios(axiosConfig));
//   });

//   const response = await Promise.all(axiosConfigList); // .allSettled will return the status for each
//   // const response = await Promise.all(axiosConfigList); // .all rejects if at least one rejected
//   // console.log(response);
//   return response;
// };

// client.getMany = function (symbols, customConfig = {}) {
//   return client.many(symbols, {...customConfig, method: 'GET'});
// };
