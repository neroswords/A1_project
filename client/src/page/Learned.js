import React, { useState, useEffect } from "react";
import Table from '../Components/Table/Table';
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {connect,useSelector} from "react-redux"
import tReducer from "../Reducers/tReducers";

const Styles = styled.div` 
.learned-page {
    display: flex;
}
.container {
    margin-top:2%
}
`
// const mapStateToProps = (state) =>{
//     return {
//         ichange : state
//     }
// }
function Learned(props){
    const [deleteState,setdeleteState] = useState([]);
    const delete_trained =(data)=>{
        const delete_data = deleteState
        if (deleteState[0]){
            fetch('/train_bot/delete/'+data, {
                method : 'POST',
                headers : {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type':'application/json'
                    },
                    body : JSON.stringify(delete_data),
                });
                console.log(data)
                window.location.reload("bot/"+deleteState.bot_id+'/trained');
        }
     
      
        
    }
    const add_data = (data) =>{
        deleteState.push(data)
        console.log(deleteState)
    }
    const id = (data) =>{
        console.log(id.botID)
    }

    

      
    return(
        <Styles>
        <div className="learned-page">
            <Navbar_member botID = {props.match.params.bot_id}  />
            <div className="container">
              
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Trained</h2>
                    <div className="p-2 bd-highlight">
                        <button className="btn btn-danger" type="button" onClick = {() => delete_trained(props.match.params.bot_id) } >Delete</button>
                    </div>
                    {/* <div className="p-2 bd-highlight">
                        <Link to={'/bot/'+props.match.params.bot_id+'/training'}>
                            <button className="btn btn-success" type="button">Training</button>
                        </Link>
                    </div> */}
                </div>
                <hr></hr>
                <Table botID={props.match.params.bot_id} delete_trained={delete_trained} add_data={add_data}  />
            </div>

            </div>
                
        </Styles>
    );

}

export default Learned;