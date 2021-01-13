import React from 'react';
import Table from '../components/table/Tablecon';
import Navbar_member from '../components/Navbar/navbar_member';

import styled from 'styled-components';

const Styles = styled.div` 
.train-page {
    display: flex;
}
.container {
    margin-top:2%
}
` 

function Train(){
    return(
        <Styles>
        <div className="train-page">
            <Navbar_member/>
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Trainning</h2>
                    <div className="p-2 bd-highlight"><button className="btn btn-danger" type="button">Delete</button></div>
                    <div className="p-2 bd-highlight"><button className="btn btn-success" type="button">Train</button></div>
                </div>
                <hr></hr>
                <Table />
                
            </div>

        </div>
        </Styles>      
        
    );
}

export default Train;