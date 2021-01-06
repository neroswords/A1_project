import React from 'react';
import Table from '../components/table/Tablemap';

function Mapping(){
    return(
        <div>
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Trainning</h2>
                    
                </div>
                <hr></hr>
                <Table />
            </div>

        </div>
                
        
    );
}

export default Mapping;