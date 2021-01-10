import React from 'react';
import Table from '../components/table/Tablecon';

function Train(){
    return(
        
        <div>
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Trainning</h2>
                    <div className="p-2 bd-highlight"><button className="btn btn-danger" type="button">Delete</button></div>
                    <div className="p-2 bd-highlight"><button className="btn btn-success" type="button">Train</button></div>
                </div>
                <hr></hr>
                    <div className="container-table">
                        <Table />
                    </div>
            </div>

        </div>
              
        
    );
}

export default Train;