import FileSaver from "file-saver";
import React from "react";
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

export const Visualize = () => {
  const [containerRef, { width: containerWidth }] = useMeasure();
  // The chart that we want to download the PNG for.
  const [chart, setChart] = React.useState();

  const [loading, setLoading] = React.useState();
  async function getData({value}){
    console.log(value)
    await setLoading(true)
    // fetch('/train_bot/delete/training/',{
    //   method : 'GET',
    //   headers : {
    //       "Access-Control-Allow-Origin": "*",
    //       'Content-Type':'application/json'
    //       },
    //       body : JSON.stringify(type),
    //   });
    await setLoading(false)
  }

  const handleDownload = React.useCallback(async () => {
    // Send the chart to getPngData
    // const pngData = await getPngData(chart);
    // //Use FileSaver to download the PNG
    // FileSaver.saveAs(pngData, "test.png");
  }, [chart]);

  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
  ];
  
  
  
  return (
    <div id="container" ref={containerRef}>
      <br />

      <div className="head-selector">  
        <select onChange={getData} className="selector-option">
          <option value="Week">Week</option>
          <option value="Month">Month</option>
          <option value="Year">Year</option>
        </select>
      </div>

      <LineChart className="LineChart"
        ref={(ref) => setChart(ref)} // Save the ref of the chart
        data={data}
        height={500}
        width={1000}
        margin={{ top: 5, right: 40, left: 20, bottom: 25 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <span style={{ float: "left" }}>
        <button onClick={handleDownload}>Download</button>
      </span>
      <br />
      
    </div>
  );
};

export default Visualize;
