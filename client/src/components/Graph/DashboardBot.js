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

.showgraph-type-y {
    margin-left: 20%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }

  .showgraph-type-x {
    position:absolute;
    right:15%;
    margin-top: -5%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }


  .showgraph-type-y h4{
    position: relative;
    right: 0;
    font-size: 14px;
    font-weight: 600;
    /* width: 500px; */
    /* max-width: 500px; */
    color: #000;
    /* border: 2px solid #fca311; */
    background-color : #fca311;
    border-radius: 1rem;
    padding: 5px 20px; 
  }

  

  .showgraph-type-x h4{
    position: relative;
    font-size: 14px;
    font-weight: 600;
    /* width: 500px; */
    /* max-width: 500px; */
    color: #000;
    /* border: 2px solid #fca311; */
    background-color : #fca311;
    border-radius: 1rem;
    padding: 5px 20px; 
  }


@media only screen and (max-width: 1600px) {
  .LineChart {
    margin-left: 10%;
    
  }

  .showgraph-type-y {
    margin-left: 10%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }

  .showgraph-type-x {
    position:absolute;
    right:5%;
    margin-top: -4.5%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }
  
}

@media screen and (max-width: 1980px) and (min-width: 1700px) {
  .LineChart {
    margin-left: 20%;
    
  }
  
  .showgraph-type-y {
    margin-left: 20%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }

  .showgraph-type-x {
    position:absolute;
    right:15%;
    margin-top: -3.5%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }
}

`;

export const DashboardBot = ({ botID }) => {
  const [containerRef, { width: containerWidth }] = useMeasure();
  const [chart, setChart] = React.useState();
  console.log(botID)
  const [dataChart, setDataChart] = React.useState();


  const [loading, setLoading] = React.useState();
  const [head, setHead] = React.useState();
  async function getData(event) {
    setHead(event.target.value)
    await setLoading(true)
    fetch('/bot/' + botID + '/dashboard/' + event.target.value)
      .then(res => res.json().then(data => {
        console.log(data)
        setDataChart(data)

      }))
    await setLoading(false)
  }

  const data = [
    { name: "Page A", Line: 4000 },
    { name: "Page B", Line: 3000 },
    { name: "Page C", Line: 2000 },
    { name: "Page D", Line: 2780 },
    { name: "Page E", Line: 1890 },
    { name: "Page F", Line: 2390 },
    { name: "Page G", Line: 3490 }
  ];


  const header = () => {
    if (head == 'daily') {
      return (<h3>Daily</h3>)
    }
    else if (head == 'day') {
      return (<h3>By Date</h3>)

    } else if (head == 'month') {
      return (<h3>By Month</h3>)
    }

  }

  const showType = () => {
    if (head == 'daily') {
      return (<h4 className="type-x"> เวลา</h4>)
    }
    else if (head == 'day') {
      return (<h4 className="type-x">วัน</h4>)

    } else if (head == 'month') {
      return (<h4 className="type-x">เดือน</h4>)
    }

  }


  return (
    <Styles>
      <div id="container-graph" ref={containerRef}>

        <br />
        <div className="head-selector">
          <select onChange={getData} className="selector-option">
            <option value="daily">Today</option>
            <option value="day">By Date</option>
            <option value="month">By Month</option>
          </select>
        </div>

        <h3 className="header-text" >{header()}</h3>

        <div className="Linechart-container">
          <div className='showgraph-type-y'>
            <h4 className="type-y">ยอดข้อความ</h4>
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
           
            <Line type="monotone"
              dataKey="count"
              stroke="#82ca9d"
            />

          </LineChart>

          <div className='showgraph-type-x'>
            {showType()}
          </div>
        </div>

      </div>
    </Styles>

  );
};

export default DashboardBot;
