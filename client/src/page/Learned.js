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
    const  [Info,setInfo] = useState([]);
    const delete_trained =(data)=>{
        var newdata = []
        var i = 0

        // var a = []
        for (i = 0; i < data.length; i++){
            newdata.push(data[i].original)
        }
        // console.log(data)
        console.log(newdata)
        // console.log(data[0].original.ReplyWord)
        // const newdata = new FormData();
        // newdata.append('id', data);
        // newdata.append('gender' ,this.gender.value);
        // newdata.append('age' ,this.age.value);

        if (data[0]){
            fetch('/train_bot/delete/'+data[0].original.id, {
                method : 'POST',
                headers : {
                    "Access-Control-Allow-Origin": "*",
                    'Content-Type':'application/json'
                    },
                    body : JSON.stringify(newdata),
                });
<<<<<<< HEAD
                window.location.reload("bot/"+deleteState.bot_id+'/trained');
        }
     
      
        
=======
                console.log(data)
                window.location.reload("bot/"+deleteState.bot_id+'/trained');
        }    
>>>>>>> 52e311a932d5823f21aee0ad94cec113e0026d05
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
            <Navbar_member botID = {props.match.params.bot_id} path={"trained"}  />
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
                <Table botID={props.match.params.bot_id} delete_trained={delete_trained}  />
            </div>

            </div>
                
        </Styles>
    );

}

export default Learned;