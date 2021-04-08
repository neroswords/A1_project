import React, { useEffect, useState,Fragment, useCallback } from 'react';
import Tablemap from '../Components/Table/Tablemap';
import Navbar_member from '../Components/Navbar/navbar_member';



import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const Styles = styled.div` 
.mapping-page {
    display: flex;
    min-height: 92vh;
}
.container {
    margin-top:2%
}

` 



function Mapping(props){
  
    return(
        <Styles>
        
        <div className="mapping-page">
            <Navbar_member botID = {props.match.params.bot_id} path={"mapping"} />
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Mapping</h2>
                    
                </div>

              
                <hr></hr>
                <Tablemap 
                botID={props.match.params.bot_id}
                />
                    
            </div>

        </div>
        </Styles>        
        
    );
}

export default Mapping;