import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Chart from '../components/Chart';

export default function Stock({ stocks }: any) {
  console.log('data', stocks)


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
          
        <Chart/>
        </>
    )
}


