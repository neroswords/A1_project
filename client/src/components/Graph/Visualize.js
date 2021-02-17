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
import { getPngData } from "recharts-to-png";
import "./styles.css";

export const Visualize = () => {
  const [containerRef, { width: containerWidth }] = useMeasure();
  // The chart that we want to download the PNG for.
  const [chart, setChart] = React.useState();

  const handleDownload = React.useCallback(async () => {
    // Send the chart to getPngData
    const pngData = await getPngData(chart);
    // Use FileSaver to download the PNG
    FileSaver.saveAs(pngData, "test.png");
  }, [chart]);

  const data = [
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
      <h2>recharts-to-png example with FileSaver</h2>
      <br />
      <LineChart
        ref={(ref) => setChart(ref)} // Save the ref of the chart
        data={data}
        height={300}
        width={600}
        margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
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
      <p>Source</p>
      <embed
        type="text/html"
        src="https://codesandbox.io/embed/busy-lake-dyy8q?autoresize=1&fontsize=14&hidenavigation=1&theme=light&view=editor"
        width={containerWidth}
        height={600}
      />
    </div>
  );
};

export default Visualize;
