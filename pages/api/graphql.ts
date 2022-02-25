import {ApolloServer} from  "apollo-server-micro";
import {typeDefs} from  "./schemas";
import {resolvers}from  "./resolvers";
import Cors from 'micro-cors';

const cors = Cors();

const apolloServer = new ApolloServer({typeDefs, resolvers});
const startServer = apolloServer.start()

export const config = {
    api:  {
        bodyParser:  false
    }
};

console.log('resolvers,', resolvers)

// export default apolloServer.start().then(() => apolloServer.createHandler({ path:  "/api/graphql"  }));
export default cors(async function handler(req, res) {
    if (req.method === 'OPTIONS') {
      res.end()
      return false
    }
    await startServer
  
    await apolloServer.createHandler({
      path: '/api/graphql',
    })(req, res)
  })