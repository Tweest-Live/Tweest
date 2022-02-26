import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router'

export default function Stock() {

    const [symbol, setSymbol] = useState('')
    const router = useRouter()
    useEffect(() => {
        const symbol =  router.query.symbol as string;
        setSymbol(symbol)
      }, []);

    return (
        <p>
            Stock page for {symbol}
        </p>
    )
}