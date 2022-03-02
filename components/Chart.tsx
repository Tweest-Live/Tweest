import * as React from 'react';
import Gauge from './gaugeChart';
import GetLiveData from './live-data-model';


export default function Chart({stocks}:any){
  return(
    <>
    <Gauge stocks={stocks}></Gauge>
    <GetLiveData/>
    
    </>
  )
}

import { useQuery, gql } from "@apollo/client";

 const GET_LIVE_DATA = gql`
 {
    getLiveData {
      symbol
      timestamp
      close
    }
  }
`



      
    

  

   
        

 


    