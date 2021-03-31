import React from 'react'
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import Visualize from "../Components/Graph/Visualize";

const Styles = styled.div` 
.history-page {
    display: flex;
    min-height: 92vh;
}
.container {
    margin-top:2%
}
` 
function History(props){
    return(
        <Styles>
            <div className="history-page">
                <Navbar_member botID = {props.match.params.bot_id} path={"history"} />
                <div className="container">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>History</h2> 
                    <Visualize/>
                </div>
            </div>
        </Styles>
    );
}

export default History;