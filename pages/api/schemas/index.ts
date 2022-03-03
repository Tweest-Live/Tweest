import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs  =  gql`
    type Stock {
      symbol: String
      timestamp: [Int]
      close: [Float]
    }

    type Tweet {
      text: String 
      username: String
      created_at: String
    }

    type Query {
      getStocks: [Stock]
      getStock(symbol: String!): Stock
      getLiveData: [Stock]
      getTweets(symbol: String!): [Tweet]
    }
`