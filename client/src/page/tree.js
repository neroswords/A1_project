import React, { useState, useEffect,Fragment } from "react";
import Table from '../Components/Table/Table';
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import "react-d3-treemap/dist/react.d3.treemap.css";
import 'react-orgchart/index.css';
import data from "./data.json";
import randomcolor from "randomcolor";
import "../Page/style.css";
import { Container } from "react-bootstrap";
import ReactFlow from 'react-flow-renderer';
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
 


const Card = (props) => {
    const levelColor = randomcolor();
    fetch('/profile/check/', {
      method : 'POST',
      headers : {
          "Access-Control-Allow-Origin": "*",
          'Content-Type':'application/json'
          },
      });
    console.log()
    console.log(props.data)
    return (
      
      // <Container className = "Con-test">
      <ul >
        {props.data.map((item) => (
          <Fragment key={item.name}>
            <li >
              <div className="card" >
                {/* <div className="image">
                  <img
                    // src={faker.image.avatar()}
                    // alt="Profile"
                    style={{ borderColor: levelColor }}
                  />
                </div> */}
                <div className="card-body">
                  <p>{item.test}</p>
                  <p>{item.name}</p>
                </div>
                <div className="card-footer" style={{ background: levelColor }}>
                </div>
              </div>
              {item.children?.length && <Card data={item.children} />}
            </li>
          </Fragment>
        ))}
      </ul>
    );
  };
  
  const Chart = () => {
    return (
      <div className="org-tree">
        <Card data={data} />
      </div>
    );
  };
  
  export default Chart;
  