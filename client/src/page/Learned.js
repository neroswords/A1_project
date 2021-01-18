import React from 'react';
import Table from '../Components/Table/Table';
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const Styles = styled.div` 
.learned-page {
    display: flex;
}
.container {
    margin-top:2%
}
`

function Learned(props){
    return(
        <Styles>
        <div className="learned-page">
            <Navbar_member botID = {props.match.params.bot_id} />
            <div className="container">
                
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Trained</h2>
                    <div className="p-2 bd-highlight">
                        <button className="btn btn-danger" type="button">Delete</button>
                    </div>
                    <div className="p-2 bd-highlight">
                        <Link to={'/bot/'+props.match.params.bot_id+'/training'}>
                            <button className="btn btn-success" type="button">Training</button>
                        </Link>
                    </div>
                </div>
                <hr></hr>
                <Table botID={props.match.params.bot_id} />
            </div>

            </div>
                
        </Styles>
    );
}

export default Learned;