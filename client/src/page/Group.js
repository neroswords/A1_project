import React from 'react';
import Table from '../components/table/Table';

function Group(){
    return(
        <div>
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Trainning</h2>
                    <div className="p-2 bd-highlight"><button className="btn btn-danger" type="button">Delete</button></div>
                    
                </div>
                <hr></hr>
                <Table />
            </div>

        </div>
                
        
    );
}

export default Group;