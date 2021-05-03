import React, {useState, useEffect} from 'react'
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import DashboardBot from "../Components/Graph/DashboardBot";
import {Link} from "react-router-dom";

const Styles = styled.div` 
.history-page {
    display: flex;
    min-height: 92vh;
}
.container-fluid {
   padding: 20px 40px;
   width: 100%;
   overflow: hidden;
}
.title-dashboard{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.title-dashboard h2{
   font-weight: 600;
}
.show-history{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 1%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
}
.CircleRight{
    color: white;
    
}
.MoreInfo{
    color: white;
    margin-left: 30%;
}
.icon{
    color: #E0E0E0 ;
}
.bot-name-on-page {
    
    margin-bottom: 10px;
    /* width: 150px; */
    /* max-width: 800px; */
    width: max-content;
    border-radius: 1rem;
  }

  .bot-name-on-page h4{
    position: relative;
    right: 0;
    font-size: 14px;
    font-weight: 600;
    /* width: 500px; */
    /* max-width: 500px; */
    color: #fff;
    /* border: 2px solid #fca311; */
    background-color : #fca311;
    border-radius: 1rem;
    padding: 5px 20px; 
  }
`


function Dashboard(props) {

    const [history, setHistoryState] = useState([]);

    useEffect(() => {
        fetch('/history/' + props.match.params.bot_id)
          .then(res => res.json().then(data => {
           setHistoryState(data)
            
          }))
    
      }, []);

    return (
        <Styles>
            <div className="history-page">
                <Navbar_member botID={props.match.params.bot_id} path={"dashboard"} />
                <div className="container-fluid">
                    <div className="bot-name-on-page">
                        <h4> Bot name :</h4>
                    </div>
                    <div className="title-dashboard">
                        <h2 className='p-2 flex-grow-1 bd-highlight' id="history-header">Dashboard bot</h2>
                    </div>
                
                    <div className="show-history">
                        <DashboardBot botID={props.match.params.bot_id}/>
                    </div>
                </div>
            </div>
        </Styles>
    );
}

export default Dashboard;