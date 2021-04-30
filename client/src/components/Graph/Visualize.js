// import FileSaver from "file-saver";
import React, { useEffect } from "react";
import { useMeasure } from "react-use";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
// import { getPngData } from "recharts-to-png";
import styled from 'styled-components';

const Styles = styled.div`
#container {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  width: 800px;
  height: 800px;
  background-color: #fff;
  
}

.head-selector{
  display: flex;
  justify-content: flex-end;
}
.selector-option{
  width: 100px;
  height: 100px;
}


@media screen and (min-width: 400px) {
  .LineChart{
      width: 100px;
      height: 50px;
  }
  
}

@media screen and (min-width: 641px) and (max-width: 960px) {
  .LineChart{
      width: 500px;
      height: 500px;
  }
  
}

@media screen and (max-width: 960px) {
  .LineChart{
      width: 500px;
      height: 500px;
  }
  
}

`;

export const Visualize = ({ botID }) => {
  const [containerRef, { width: containerWidth }] = useMeasure();
  const [chart, setChart] = React.useState();
  console.log(botID)
  const [dataChart, setDataChart] = React.useState();


  const [loading, setLoading] = React.useState();
  async function getData( event ) {
    console.log(event.target.value)
    await setLoading(true)
      fetch('/sales/' + botID + '/' + event.target.value )
      .then(res => res.json().then(data => {
        setDataChart(data)

      }))
    await setLoading(false)
  }
  useEffect(() => {
    fetch('/sales/' + botID + '/' + '/month' )
      .then(res => res.json().then(data => {
        setDataChart(data)

      }))

  }, []);
  const data = [
    { name: "Page A", Line: 4000},
    { name: "Page B", Line: 3000},
    { name: "Page C", Line: 2000},
    { name: "Page D", Line: 2780},
    { name: "Page E", Line: 1890},
    { name: "Page F", Line: 2390},
    { name: "Page G", Line: 3490}
  ];



  return (

    <div id="container-graph" ref={containerRef}>

      <br />
      <div className="head-selector">
        <select  onChange={getData} className="selector-option">
          <option value="daily">Today</option>
          <option value="day">By Date</option>
          <option value="month">By Month</option>
        </select>
      </div>

      <LineChart className="LineChart"
        ref={(ref) => setChart(ref)} // Save the ref of the chart
        data={dataChart}
        height={500}
        width={1000}
        margin={{ top: 5, right: 40, left: 20, bottom: 25 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend wrapperStyle={{ bottom: 5 }} />
        {/* <Line
          type="monotone"
          dataKey="Facebook"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        /> */}
        <Line type="monotone" 
        dataKey="income" 
        stroke="#82ca9d" 
        />
        
      </LineChart>

    </div>

  );
};

export default Visualize;
