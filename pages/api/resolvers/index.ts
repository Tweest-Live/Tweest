import axios from "axios";
import {AxiosRequestConfig, Methods} from "../../../types/axiosTypes";

interface Stock {
  symbol: string, 
  timestamp: number[], 
  close: number[],
  [key:string]: any
}

interface Tweet {
  id: string,
  text: string, 
  author_id: string,
  created_at: string,
  username?: string
}

interface TwitterUser {
  id: string, 
  name: string,
  username: string
}

interface UserData {
  data: TwitterUser[]
}

interface Users {
  [key:string]:string
}

const API_KEY = process.env.STOCK_API_KEY;
const TWITTER_API_TOKEN = process.env.TWITTER_API_TOKEN;

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

const createTwitterOptions = (url: string) : AxiosRequestConfig => {
  return {
    method: 'GET',
    url: url,
    headers: {
      'Authorization': `Bearer ${TWITTER_API_TOKEN}` 
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
        return Object.values(stocks.data as {[key:string]: Stock}).map(({ symbol, timestamp, close } : Stock) => ({
          symbol, timestamp, close
        }));
      }
      catch(error) {
        throw error
      }
    },
    getTweets: async(parent: any, args:{[key:string]: string}) => {
      try {
        const options = createTwitterOptions(`https://api.twitter.com/2/tweets/search/recent?query=%23${args.symbol}&tweet.fields=author_id,created_at`);
        const tweetResponse =  await axios.request(options);
        const data: Tweet[] = tweetResponse.data.data;
        const authorIDs = data.reduce((acc: string,curr: Tweet) =>  acc.concat(curr.author_id + ","), "").slice(0,-1)
        const query = "https://api.twitter.com/2/users?ids=" + authorIDs;
        const idOptions = createTwitterOptions(query)
        const response = await axios.request(idOptions);
        const userData: UserData =  response.data
        const users: Users = {};
        userData.data.forEach((user: TwitterUser) => users[user.id] = user.username)
        data.forEach((tweet: Tweet) => tweet.username = users[tweet.author_id])
        return data.map(({text, username, created_at}) => ({
            text, 
            username, 
            created_at, 
          }
        ))
      }
      catch(error) {
        throw error
      }
    },
  },
};