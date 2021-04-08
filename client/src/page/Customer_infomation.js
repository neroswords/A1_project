import React from 'react'
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import Table from '../Components/Table/Tablemap';
const Styles = styled.div` 
.customer-page {
    display: flex;
    min-height: 92vh;
}
.container {
    margin-top:2%
}
` 
function Customer_infomation(props){
    return(
        <Styles>
            <div className="customer-page">
               <Navbar_member botID = {props.match.params.bot_id} path={"customer_infomation"} />
               <div className="container">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Customer Infomation</h2> 
               </div> 
            </div>
        </Styles>
    );
}

export default Customer_infomation;