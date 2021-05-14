import React, { useEffect, useState,Fragment, useCallback } from 'react';
import TableTotalor from '../Components/Table/TableTotalorder';
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const Styles = styled.div` 
.totalorder-page {
    display: flex;
    min-height: 92vh;
}
.totalorder-page .container-fluid {
    padding: 20px 40px;
    width: 100%;
    overflow:hidden;
}
.totalorder-title{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.totalorder-title h2{
    font-weight:600;
}
.showtabletotalorder{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 5px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
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

function TotalOrder(props){

    const [name, setName] = useState();
    const [loading,setLoading] = useState(false);
    const [reload,setReload] = useState(false)
    useEffect(() => {
        fetch('/bot/'+props.match.params.bot_id) .then(response => response.json().then(inf => {
        setName(inf)
        setLoading(true)
    }))
    })
  
    return(
        <Styles>
        
        <div className="totalorder-page">
            <Navbar_member botID = {props.match.params.bot_id} path={"history"} />
            <div className="container-fluid">
            <div className="bot-name-on-page">
                    <h4> Bot name : {name}</h4>
                </div>
                <div className="totalorder-title d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight' id="group-header">Total Order</h2>
                    {/* <div className="p-2 bd-highlight"><button className="btn btn-danger" type="button">Delete</button></div> */}
                </div>
                <div className="showtabletotalorder">
                    <TableTotalor 
                        botID={props.match.params.bot_id}
                    />  
                </div>
            </div>

        </div>
        </Styles>        
        
    );
}

export default TotalOrder;