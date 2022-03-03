import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import GaugeChart from "react-gauge-chart";
import { resolveReadonlyArrayThunk } from 'graphql';
const Sentiment = require('sentiment');





const AccelDial = (props: any) => {
  const [percent, setPercent] = useState(0);
  const [textVal, setTextVal] = useState('');

  useEffect(() => {
    const sentiment = new Sentiment();
    let hashString = props.content;
    let result = sentiment.analyze(hashString);
    console.log('result:', result);
  
    let norm = 1;
    if (result.tokens){
      norm += result.positive.length + result.negative.length ;
    }

    let offset = result.positive.length * 5 + result.negative.length * 5;
    

    let localPer = (result.score  + offset + 1) / (norm * 10 + 1);

    
    setPercent(localPer);
  
    if (localPer < 0.25) {
      setTextVal('Negative');
    } else if (localPer > 0.75) {
      setTextVal('Positive');
    } else {
      setTextVal('Neutral');
    }
  }, []);

  return (
    <>
      <div style={styles.dial}>
        <GaugeChart
          id={props.user}
          nrOfLevels={3}
          arcsLength={[2.5, 5, 2.5]}
          colors={["red", "yellow", "green"]}
          arcPadding={0.02}
          percent={percent}
          textColor={"#000000"}
          needleColor={"#5392ff"}
          formatTextValue={() => textVal}
        />
      </div>
    </>
  );
};

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