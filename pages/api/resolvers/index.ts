import axios from "axios";
import {AxiosRequestConfig, Methods} from "../../../types/axiosTypes";

interface Stock {
  symbol: string, 
  timestamp: number[], 
  close: number[],
  [key:string]: any
}
const API_KEY = process.env.STOCK_API_KEY;

const createOptions = (method: Methods, url: string) : AxiosRequestConfig => {
  return {
    method: method,
    url: url,
    params: {modules: 'defaultKeyStatistics,assetProfile'},
    headers: {
      'x-api-key': API_KEY
    }
  };
}

export const resolvers = {
  Query: {
    getStocks: async () => {
      try {
        const options = createOptions('get',`https://yfapi.net/v8/finance/spark?interval=1d&range=1mo&symbols=AAPL%2CMSFT%2CAMZN%2CGOOG%2CFB
        `);
        const stocks = await axios.request(options);
        return Object.values(stocks.data as {[key:string]: Stock}).map(({ symbol, timestamp, close } : Stock) => ({
          symbol, timestamp, close
        }));
      } catch (error) {
        throw error;
      }
    },
    getStock: async (parent:any, args:{[key:string]: string}) => {
      try {
        const options = createOptions('get',`https://yfapi.net/v8/finance/spark?interval=1d&range=1mo&symbols=${args.symbol}`)
        const stock = await axios.request(options);
        const {close, symbol, timestamp} = stock.data as Stock
        return {
         close, symbol, timestamp
        };
      } catch (error) {
        throw error;
      }
    },
    getLiveData: async() => {
      try {
        const options = createOptions('get',`https://yfapi.net/v8/finance/spark?interval=1m&range=1d&symbols=AAPL%2CMSFT%2CAMZN%2CGOOG%2CFB`);
        const stocks = await axios.request(options);
        console.log('stocks', stocks)
        return Object.values(stocks.data as {[key:string]: Stock}).map(({ symbol, timestamp, close } : Stock) => ({
          symbol, timestamp, close
        }));
      }
      catch(error) {
        throw error
      }
    },
  },
};