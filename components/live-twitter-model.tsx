import { useQuery, gql } from "@apollo/client";

interface Tweets {
  text: string, 
  created_at: string, 
  username: string
}
interface TweetVar {
  symbol: string
}

const GET_TWEETS = gql`
 query GetLiveTweets($symbol: String!) {
    getTweets(symbol: $symbol) {
      text
      username
      created_at
    }
  }
`

export default function GetTweets({symbol} : TweetVar) {
  const { loading, error, data } = useQuery<Tweets[], TweetVar>(GET_TWEETS, {
    variables: {symbol},
    pollInterval: 60000,
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>{`Error! ${error}`}</div>

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}