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
import styled from 'styled-components';

const Styles = styled.div`

.head-selector{
  margin-left: 17%;
}

.header-text{
  text-align:center;
}


@media only screen and (max-width: 1600px) {
  .LineChart {
    margin-left: 10%;
    
  }
}

@media screen and (max-width: 1980px) and (min-width: 1700px) {
  .LineChart {
    margin-left: 20%;
    
  }
}
`;

export const Accession = ({ botID }) => {
  const [containerRef, { width: containerWidth }] = useMeasure();
  const [chart, setChart] = React.useState();
  console.log(botID)
  const [dataChart, setDataChart] = React.useState();


  const [loading, setLoading] = React.useState();
  const [head, setHead] = React.useState();
  async function getData( event ) {
    setHead(event.target.value)
    await setLoading(true)
      fetch('/bot/' + botID + '/' + event.target.value  )
      .then(res => res.json().then(data => {
        setDataChart(data)

      }))
    await setLoading(false)
  }
  // useEffect(() => {
  //   fetch('/bot/' + botID + '/' + '/month' )
  //     .then(res => res.json().then(data => {
  //       setDataChart(data)

  //     }))

  // }, []);
  const data = [
    { name: "Page A", Line: 4000},
    { name: "Page B", Line: 3000},
    { name: "Page C", Line: 2000},
    { name: "Page D", Line: 2780},
    { name: "Page E", Line: 1890},
    { name: "Page F", Line: 2390},
    { name: "Page G", Line: 3490}
  ];

  
  const header = () =>{
    if(head == 'daily'){
      return(<h3>Daily</h3>)
    }
    else if(head == 'day'){
      return(<h3>By Date</h3>)

    }else if(head == 'month'){
      return(<h3>By Month</h3>)
    }

  }



  return (
    <Styles>
    <div id="container-graph" ref={containerRef}>

      <br />
      <div className="head-selector">
        <select  onChange={getData} className="selector-option">
          <option value="daily">Today</option>
          <option value="day">By Date</option>
          <option value="month">By Month</option>
        </select>
      </div>

       <h3 className="header-text" >{header()}</h3> 
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
        dataKey="time" 
        stroke="#82ca9d" 
        />
        
      </LineChart>

    </div>
    </Styles>

  );
};

export default Accession;