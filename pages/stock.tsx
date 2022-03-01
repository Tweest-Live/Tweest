import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Chart from '../components/Chart';
import { gql } from "@apollo/client";
import client from "../apollo-client";

export async function getStaticProps() {
  const response = await client.query({
    query: gql`
      {
        getStocks {
          symbol
          timestamp
          close
        }
      }
    `,
  });
  return {
    props: {
      stocks: response,
    },
  };
}

export default function Stock({ stocks }: any) {

    const [symbol, setSymbol] = useState('')
    const router = useRouter()
    useEffect(() => {
        const symbol =  router.query.symbol as string;
        setSymbol(symbol)
      }, []);

    return (
        <>
        <Navbar/>
          <p>
            Stock page for {symbol} 
          </p>
          
        <Chart stocks={stocks}/>
        <p>{stocks.data.getStocks[1].symbol} from data,stocks </p>
        </>
        
    )
}