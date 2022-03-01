import  {  gql  }  from  "apollo-server-micro"; 

export  const  typeDefs  =  gql`
    type Stock {
      symbol: String
      timestamp: [Int]
      close: [Float]
    }

    type StockSocket {
      id: String
      price: Float
      time: String
      exchange: String
      quoteType: String
      marketHours: String
      changePercent: Float
      dayVolume: Int
      change: Float
      priceHint: Int  
    }

    type Query {
      getStocks: [Stock]
      getStock(symbol: String!): Stock
      getLiveData: StockSocket
    }
`