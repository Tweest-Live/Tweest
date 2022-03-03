import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import { ResponsiveLine } from "@nivo/line";
import { CartesianGrid, LineChart, Line, XAxis, YAxis } from 'recharts';

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
`

export default function GetLiveData() {
  const router = useRouter();
  const symbol = router.query.symbol as string;
 
  const { loading, error, data } = useQuery(GET_LIVE_DATA, {
    pollInterval: 60000,
  });
  if (loading) return <div>Loading</div>;
  if (error) return <div>{`Error! ${error}`}</div>
  
  const chartData = data.getLiveData[StockIndex[symbol as keyof typeof StockIndex]];

  const chartDataFormatted = chartData.close.map((entry: number, i: number) => {
    const obj: any = {};
    obj.name = symbol;
    obj.y = entry;
    obj.x = new Date(chartData.timestamp[i]*1000);
    return obj
  })

  // const mainChartData = [{
  //   id: symbol, 
  //   data: chartDataFormatted
  // }]
  // console.log(mainChartData)
  return (
    <div >
        {/* <ResponsiveLine
          data = {mainChartData}
          xScale={{type: "linear"}}
          yScale={{type: "linear"}}
        /> */}

    <LineChart width={400} height={400} data={chartDataFormatted}>
      <Line type="monotone" dataKey="y" stroke="#8884d8" />   
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="x" />
      <YAxis />
    </LineChart>
    </div>
  );
}
