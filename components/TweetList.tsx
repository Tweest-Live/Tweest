import React, { useState, useEffect } from 'react';
import { useQuery, gql } from "@apollo/client";
import TweetItem from './TweetItem';

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

function formatTime(time : Date) : string {
  const formatted = [
    time.getFullYear(),
    '-',
    time.getMonth() + 1,
    '-',
    time.getDate(),
    ' ',
    time.getHours(),
    ':',
    time.getMinutes(),
    ':',
    time.getSeconds()
  ].join('');

  return formatted;
}

export default function TweetList({ symbol }: TweetVar) {
  const [updatedTime, setUpdatedTime] = useState(new Date());
  const [tweets, setTweets] = useState<any>([]);

  const { loading, error, data } = useQuery<Tweets[], TweetVar>(GET_TWEETS, {
    variables: { symbol },
    pollInterval: 60000,
    notifyOnNetworkStatusChange: true,
    onCompleted : (data) => {
      const newTime = new Date;
      setUpdatedTime(newTime);
    }
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>{`Error! ${error}`}</div>

  return (
    <div>
      <h2>
        Tweets Last updated {formatTime(updatedTime)}
      </h2>
      <div>
          {[...data.getTweets].map((tweet, i) => 
            <TweetItem user={tweet.username} content={tweet.text} created_at ={tweet.created_at}/>
          )}
      </div>
    </div>
  );
}