import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs  =  gql`
    type Stock {
        symbol: String
        timestamp: [Int]
        close: [Float]
    }

    type Query {
      getStocks: [Stock]
      getStock(symbol: String!): Stock
    }

    type Subscription {
        getStocks: [Stock]
        getStock(symbol: String!): Stock
    }`