import React, { useEffect } from "react";
// import องค์ประกอบของ chart ที่ต้องใช้ในการทำ vistualize
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
/* css ของ selector option */
.head-selector{
  margin-left: 11%;
}
/* css ของชื่อกราฟ */
.header-text{
  text-align:center;
}

/* css ของตำแหน่งหน่วยของกราฟแกน y ด้านล่างขวา */
.showgraph-type-y {
    margin-left: 10%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }

  
  /* css ของตำแหน่งหน่วยของกราฟแกน x ด้านบนซ้าย */
  .showgraph-type-x {
    position:absolute;
    right:15%;
    
    margin-top: -5%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
    margin-left: 50%;
  }

  /* css ของตัวหนังสือหน่วยของกราฟแกน y ด้านล่างขวา */
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

  
  /* css ของตัวหนังสือหน่วยของกราฟแกน x ด้านบนซ้าย */
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
    /* margin-left: 50%; */
  }


  @media only screen and (max-width: 1600px) {
  .LineChart { 
    /* กำหนดตำแหน่งกราฟที่แสดง */
    margin-left: 10%;
    
  }
  /* css ของตำแหน่งหน่วยของกราฟแกน y ด้านล่างขวา */
  .showgraph-type-y {
    margin-left: 10%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }
  /* css ของตำแหน่งหน่วยของกราฟแกน x ด้านบนซ้าย */
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

@media screen and (max-width: 2000px) and (min-width: 1700px) {
  .LineChart {
    /* กำหนดตำแหน่งกราฟที่แสดง */
    margin-left: 20%;
    
  }
  /* css ของตำแหน่งหน่วยของกราฟแกน y ด้านล่างขวา */
  .showgraph-type-y {
    margin-left: 20%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }
  /* css ของตำแหน่งหน่วยของกราฟแกน x ด้านบนซ้าย */
  .showgraph-type-x {
    position:absolute;
    right:10%;
    margin-top: -3.5%;
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }
}
`;

export const Visualize = ({ botID }) => {
  const [chart, setChart] = React.useState();
  const [dataChart, setDataChart] = React.useState(); // สรา้งเพื่อเป็นตัวที่จะรับค่าเกี่ยวกับข้อมูลเกี่ยวกับกราฟ


  const [loading, setLoading] = React.useState(); 
  const [head, setHead] = React.useState("daily"); //State สร้างขึนมาเพื่อน กำหนดค่าเริ่มต้นของชื่อกราฟให้เป็น daily โดยถูกนำไปใช้สร้างเงือนไขที่ const showType

  async function getData(event) {
    setHead(event.target.value)
    await setLoading(true)
    fetch('/sales/' + botID + '/' + event.target.value)
      .then(res => res.json().then(data => {
        setDataChart(data)

      }))
    await setLoading(false)
  }
  useEffect(() => {
    fetch('/sales/' + botID + '/' + '/daily')
      .then(res => res.json().then(data => {
        setDataChart(data)

      }))

  }, []);

  // เงื่อนไขการแสดงชื่อกราฟ โดยเชื่อมกับ state ที่ชื่อ head ที่ตั้งค่าเริ่มต้นเป็น daily ค่าที่แสดงจะออกมาเป็น Daily 
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
  // เงื่อนไขการแสดงแกน x ของกราฟ ว่าเป็น เวลา วัน เดือน โดยเชื่อมกับ state ที่ชื่อ head ที่ตั้งค่าเริ่มต้นเป็น daily แกน x จะออกมาเป็น เวลา
  const showType = () => {
    if (head == 'daily') {
      return (<h4 className="type-x">เวลา</h4>)
    }
    else if (head == 'day') {
      return (<h4 className="type-x">วัน</h4>)

    } else if (head == 'month') {
      return (<h4 className="type-x">เดือน</h4>)
    }

  }


  return (
    <Styles>
      <div id="container-graph">

        <br />
        {/* ปุ่ม selector เพื่อทำการเลือกว่าจะดู Today By Date By Month เมื่อมีการเปลี่ยนแปลงจะไป function getData  */}
        <div className="head-selector">
          <select onChange={getData} className="selector-option">
            <option value="daily">Today</option>
            <option value="day">By Date</option>
            <option value="month">By Month</option>
          </select>
        </div>
        {/* แสดงชื่อของกราฟด้านบนโดยจะได้ตรวจสอบเงื่อนไขที่ const header */}
        <h3 className="header-text" >{header()}</h3> 

        <div className="Linechart-container">
          {/* หน่วยแกน y ของกราฟ ที่จะแสดงด้านล่างขวาของกราฟ */}
          <div className='showgraph-type-y'> 
            <h4 className="type-y">รายรับ (บาท) </h4>
          </div>

          <LineChart className="LineChart" // นำค่าที่ import มาเรียกใช้
            ref={(ref) => setChart(ref)} // Save the ref of the chart
            data={dataChart} // เพื่อรับค่าข้อมูลของกราฟ
            height={500} //กำหนดความสูงของกราฟ
            width={1000} //กำหนดความกว้างของกราฟ
            margin={{ top: 5, right: 40, left: 20, bottom: 25 }} //กำหนดตำแหน่งของกราฟ

          >
            {/* กำหนดการแสดงค่าข้างในของกราฟ */}
            <XAxis dataKey="name" /> 
            <YAxis /> 
            {/* ขนาดของ grid ด้านในกราฟ */}
            <CartesianGrid strokeDasharray="3 3" />
            {/* เพื่อแสดงจำนวนของค่าที่พลอตกราฟเมื่อนำเมาส์ไปชี้ */}
            <Tooltip />
            {/* แสดงค่าของตัวแสดงหน่วย */}
            <Legend wrapperStyle={{ bottom: 5 }} />
            <Line type="monotone" // ตัวกำหนดการแสดงของเส้นกราฟ
              dataKey="income"
              stroke="#82ca9d"
            />

          </LineChart>

          {/* หน่วยแกน x ของกราฟ ที่จะแสดงด้านบนซ้ายของกราฟ โดยจะไปตรวจสอบ const showType*/}
          <div className='showgraph-type-x'>
            {showType()}
          </div>

        </div>


      </div>
    </Styles>
  );
};

export default Visualize;
