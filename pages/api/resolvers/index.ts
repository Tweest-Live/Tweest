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

      }
      catch(error) {
        throw error
      }
    },
  },

};
  // Subscription: {
  //   getStocks: async () => {
  //     try {
  //       const users = await axios.get(`https://yfapi.net/v8/finance/chart/AAPL?range=1mo&region=US&interval=1d&lang=en&events=div%2Csplit`);
  //       return users.data.map(({ id, login, avatar_url }) => ({
  //         id,
  //         login,
  //         avatar_url
  //       }));
  //     } catch (error) {
  //       throw error;
  //     }
  //   },
  //   getStock: async (parent:any, args:{[key:string]:any}) => {
  //     try {
  //       const user = await axios.get(
  //         `https://api.github.com/users/${args.name}`
  //       );
  //       return {
  //         id: user.data.id,
  //         login: user.data.login,
  //         avatar_url: user.data.avatar_url
  //       };
  //     } catch (error) {
  //       throw error;
  //     }
  //   }
  // }