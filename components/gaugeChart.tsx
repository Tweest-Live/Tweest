import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import GaugeChart from "react-gauge-chart";
const Sentiment = require('sentiment');


const AccelDial = ({stocks}:any) => {
    const [symbol, setSymbol] = useState('')
    const router = useRouter()
    useEffect(() => {
    const symbol =  router.query.symbol as string;
    setSymbol(symbol)
  }, []);
    //sentiments
    let value1:string
    
    
    let percent = (score+5)/10
    console.log("sco",result.score)
    console.log('pp',percent)
    
    let sentiment:string;
    if(percent<0.25){
      value1='Negative';
    }else if(percent>0.25 && percent<0.75){
      value1="Neutral";
    }else if(percent>0.25){
      value1='Positive';
    }
   
   
  
    return (
      <>
      <div style={styles.dial}>
        <GaugeChart
          id={symbol}
          nrOfLevels={3}
          arcsLength={[2.5,5,2.5]}
          colors={["red", "yellow", "green"]}
          arcPadding={0.02}
          percent={percent}
          textColor={"#000000"}
          needleColor={"#5392ff"}
          formatTextValue={() => value1}
          
        />
        <div style={styles.title}>{symbol}</div>
       
        
        
      </div>
     
    </>
      
    );
  };
const sentiment = new Sentiment();

let hashString = 'Cats evil love'
let result = sentiment.analyze(hashString);
let words;
if(result.words.length){
  words=1;
}else{
  words=result.words.length;
} 
let score=result.score/words;
console.log("score",result.score/result.words.length);
console.log('words',result.words)


const styles = {
    dial: {
      display: "inline-block",
      width: `300px`,
      height: `auto`,
      color: "#000",
      border: "0.5px solid #fff",
      padding: "2px"
    },
    title: {
      fontSize: "1em",
      color: "#000"
    }
  };
  
  export default AccelDial;

