import * as React from 'react';
import GaugeChart from "react-gauge-chart";
import ReactSpeedometer from "react-d3-speedometer";


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
  
  const AccelDial = ({stocks}:any) => {
    //sentiments
    let value = '70'
    let value2=60
    let percent = 70/100
    // value: "-50" -> percent: 0
    // value: "0" ---> percent: .5
    // value: "50" ---> percent: 1
    // -25 ... .5 + (-25/100) = .25
    // 25 ...  .5 + (25/100) = .75
    // -110 .. .5 + (-110/100) = -0.6
   
    
  
    return (
      <>
      <div style={styles.dial}>
        <GaugeChart
          id={stocks.data.getStocks[2].symbol}
          nrOfLevels={3}
          arcsLength={[0.25, 0.5, 0.25]}
          colors={["#2d74da", "#1f57a4", "#25467a"]}
          arcPadding={0.02}
          percent={percent}
          textColor={"#000000"}
          needleColor={"#5392ff"}
          formatTextValue={(value) => value}
        />
        <div style={styles.title}>{stocks.data.getStocks[2].symbol}</div>
       
        <p>negative                      <span>positive</span></p>    
        
      </div>
      {/* <ReactSpeedometer
  maxValue={500}
  value={400}
  needleColor="red"
  startColor="green"
  segments={10}
  endColor="blue"
/> */}
      
    </>
      
    );
  };
  
  export default AccelDial;

