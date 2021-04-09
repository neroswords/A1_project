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
    margin-bottom: 2%;
    margin-top: 2%;
    overflow:hidden;
}
.title-history{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
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
` 
function History(props){
    return(
        <Styles>
            <div className="history-page">
                <Navbar_member botID = {props.match.params.bot_id} path={"history"} />
                <div className="container">
<<<<<<< HEAD
                    <div className="title-history">
                        <h2 className='p-2 flex-grow-1 bd-highlight'>History</h2> 
                    </div>
                    <div className="show-history">

                    </div>
=======
                    <h2 className='p-2 flex-grow-1 bd-highlight'>History</h2> 
                    <Visualize/>
>>>>>>> 3736762ecdedf3a05a6616afeb320baa700a545f
                </div>
            </div>
        </Styles>
    );
}

export default History;