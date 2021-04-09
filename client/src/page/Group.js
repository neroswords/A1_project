import React from 'react';
import Table from '../Components/Table/Table';
import Navbar_member from '../Components/Navbar/navbar_member';

import styled from 'styled-components';

const Styles = styled.div` 
.group-page {
    display: flex;
    min-height: 92vh;
}
.container {
    margin-top: 10px;
}
` 

function Group(props){
    return(
        <Styles>
        <div className="group-page">
            <Navbar_member botID = {props.match.params.bot_id} path={"group"} />
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Group</h2>
                    {/* <div className="p-2 bd-highlight"><button className="btn btn-danger" type="button">Delete</button></div> */}
                </div>
                
            </div>

        </div>
       </Styles>         
        
    );
}

export default Group;