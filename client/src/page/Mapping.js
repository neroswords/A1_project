import React from 'react';
<<<<<<< HEAD
import Table from '../components/Table/Tablemap';
import Navbar_member from '../components/Navbar/navbar_member';
=======
import Table from '../Components/Table/Tablemap';
import Navbar_member from '../Components/Navbar/navbar_member';
>>>>>>> 43d85da73c54fe2ad402f2b9dc5e8b44ae0d5c01

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