import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Chart from '../components/Chart';
import { gql } from "@apollo/client";
import client from "../apollo-client";
import TweetList from "../components/TweetList";
import styles from '../styles/Home.module.css'

export default function Stock({ stocks }: any) {
  const [symbol, setSymbol] = useState('')
  const router = useRouter()
  useEffect(() => {
    const symbol = router.query.symbol as string;
    setSymbol(symbol);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <main className={styles.main}>
          <h1> Stock page for {symbol} </h1>
          <Chart stocks={stocks} />
          <TweetList symbol={symbol} />
        </main>
      </div>
    </>
  )
}

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
