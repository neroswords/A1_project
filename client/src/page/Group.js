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
<<<<<<< HEAD
    margin-bottom: 2%;
    margin-top: 2%;
    overflow:hidden;
}
.group-title{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}
.showtablegroup{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 1%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
}

.delete-group button{
    border-radius: 1rem;
    padding: 7px 15px;
    font-size: 15px;
    border-radius: 25px;
    /* border: 1px solid #0078ff; */
    transition: 0.5s;
=======
    margin-top: 10px;
>>>>>>> 3736762ecdedf3a05a6616afeb320baa700a545f
}
` 

function Group(props){
    return(
        <Styles>
        <div className="group-page">
            <Navbar_member botID = {props.match.params.bot_id} path={"group"} />
            <div className="container">
<<<<<<< HEAD
                <div className="group-title d-flex bd-highlight">
                    <h2 className=' p-2 flex-grow-1 bd-highlight'>Group</h2>
                    <div className="delete-group p-2 bd-highlight"><button className="btn btn-danger" type="button">Delete</button></div>
                </div>
                <div className="showtablegroup">
                    <Table />
=======
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Group</h2>
                    {/* <div className="p-2 bd-highlight"><button className="btn btn-danger" type="button">Delete</button></div> */}
>>>>>>> 3736762ecdedf3a05a6616afeb320baa700a545f
                </div>
                
            </div>

        </div>
       </Styles>         
        
    );
}

export default Group;