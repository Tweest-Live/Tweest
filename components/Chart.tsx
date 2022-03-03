import * as React from 'react';
import GetLiveData from './live-stock-model';


export default function Chart(){
  return(
    <div>
    <GetLiveData/>
    
    </div>
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



      
    

  

   
        

 


    