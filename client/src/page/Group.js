import React from 'react';
<<<<<<< HEAD
import Table from '../components/Table/Table';
import Navbar_member from '../components/Navbar/navbar_member';
=======
import Table from '../Components/Table/Table';
import Navbar_member from '../Components/Navbar/navbar_member';
>>>>>>> 43d85da73c54fe2ad402f2b9dc5e8b44ae0d5c01

import styled from 'styled-components';

const Styles = styled.div` 
.group-page {
    display: flex;
}
.container {
    margin-top:2%
}
` 

function Group(){
    return(
        <Styles>
        <div className="group-page">
            <Navbar_member />
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Group</h2>
                    <div className="p-2 bd-highlight"><button className="btn btn-danger" type="button">Delete</button></div>
                </div>
                <hr></hr>
                <Table />
            </div>

        </div>
       </Styles>         
        
    );
}

export default Group;