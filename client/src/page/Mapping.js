import React from 'react';
import Table from '../components/table/Tablemap';
import Navbar_member from '../components/Navbar/navbar_member';

import styled from 'styled-components';

const Styles = styled.div` 
.mapping-page {
    display: flex;
}
.container {
    margin-top:2%
}
` 
function Mapping(){
    return(
        <Styles>
        <div className="mapping-page">
            <Navbar_member/>
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Mapping</h2>
                    
                </div>
                <hr></hr>
                <Table />
                    
            </div>

        </div>
        </Styles>        
        
    );
}

export default Mapping;