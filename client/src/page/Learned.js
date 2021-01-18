import React from 'react';
import Table from '../Components/Table/Table';
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';

const Styles = styled.div` 
.learned-page {
    display: flex;
}
.container {
    margin-top:2%
}
`

function Learned(){
    return(
        <Styles>
        <div className="learned-page">
            <Navbar_member />
            <div className="container">
                
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Learned</h2>
                    <div className="p-2 bd-highlight"><button className="btn btn-danger" type="button">Delete</button></div>
                    
                </div>
                <hr></hr>
                <Table />
            </div>

            </div>
                
        </Styles>
    );
}

export default Learned;