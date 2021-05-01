import React, { useEffect, useState,Fragment, useCallback } from 'react';
import TableNewOrder from '../Components/Table/TableNewOrder';
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const Styles = styled.div` 
.mapping-page {
    display: flex;
    min-height: 92vh;
}
.container {
    margin-bottom: 2%;
    margin-top: 2%;
    overflow:hidden;
}
.mapping-title {
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}
.showtablemap{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 1%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
}
` 

function NewOrder(props){
  
    return(
        <Styles>
        
        <div className="mapping-page">
            <Navbar_member botID = {props.match.params.bot_id} path={"history"} />
            <div className="container">
                <div className="mapping-title">
                    <h2 className='p-2 flex-grow-1 bd-highlight' id="mapping-header">New Order</h2>
                </div>
                <div className="showtablemap">
                    <TableNewOrder 
                        botID={props.match.params.bot_id}
                    />  
                </div>
            </div>

        </div>
        </Styles>        
        
    );
}

export default NewOrder;