import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { LineChart } from "d3reactor";
interface Stock {
  symbol: string;
  time: string;
  price: number;
}

interface StockData {
  close: number[];
  symbol: string;
  timestamp: number[];
}

enum StockIndex {
  MSFT = 0,
  GOOG = 1,
  AAPL = 2,
  FB = 3,
  AMZN = 4,
}

const GET_LIVE_DATA = gql`
  {
    getLiveData {
      symbol
      timestamp
      close
    }
  }
`;

export default function GetLiveData() {
  const [symbol, setSymbol] = useState("");
  const router = useRouter();
  useEffect(() => {
    const symbol = router.query.symbol as string;
    setSymbol(symbol);
  }, []);
  console.log("curr symbol", symbol);

  const { loading, error, data } = useQuery(GET_LIVE_DATA, {
    pollInterval: 60000,
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>{`Error! ${error}`}</div>;

  const currData: StockData[] = data.getLiveData;
  console.log("liveData", currData);

  function convertTime(timeStamp: number) {
    let unix_timestamp = timeStamp;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    
    var formattedTime = hours + ":" + minutes.substring(-2) + ":" + seconds.substring(-2);
    return formattedTime;
  }

  function formattedData(time: number[], price: number[]) {
    let dataArr = [];

    for (let i = 0; i < 10; i++) {
      const stock: Stock = {} as Stock;
      stock.time = convertTime(time[i]);
      stock.symbol = symbol;
      stock.price = price[i];
      dataArr.push(stock);
    }
    return dataArr;
  }
  let programData: any = symbol
    ? formattedData(
        data.getLiveData[StockIndex[symbol as keyof typeof StockIndex]].timestamp,
        data.getLiveData[StockIndex[symbol as keyof typeof StockIndex]].close
      )
    : undefined;
  console.log("program data", programData);
  const time1 = convertTime(data.getLiveData[0].timestamp[5]);

  // let programData:any=[
  //   { "Date": "2004-07-01", "language": "Java", "popularity": 30.37 },
  //   { "Date": "2004-08-01", "language": "Java", "popularity": 29.99 },
  //   {
  //     "Date": "2004-09-01",
  //     "language": "Java",
  //     "popularity": 29.709999999999997
  //   },
  //   { "Date": "2004-10-01", "language": "Java", "popularity": 29.12 },
  //   { "Date": "2004-11-01", "language": "Java", "popularity": 29.59 },
  //   {
  //     "Date": "2004-12-01",
  //     "language": "Java",
  //     "popularity": 29.759999999999998
  //   },
  //   { "Date": "2005-01-01", "language": symbol, "popularity": 29.68 },
  //   { "Date": "2005-02-01", "language": "Java", "popularity": 30.29 }]

  return (
    <>
      <p>test time format:{time1}</p>
      {/* <LineChart
        data={programData}
        height={"90%"}
        width={"80%"}
        xKey='time'
        yKey='price'
        yAxisLabel='Price'
        yGrid={true}
        legend='right'
        colorScheme='schemeReds'
      /> */}
    </>
  );
}
