import React, { useState, useEffect } from "react";
import Table from '../Components/Table/Table';
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';

const Styles = styled.div` 
.learned-page {
    display: flex;
    min-height: 92vh;
}
.container {
    margin-bottom: 2%;
    margin-top: 2%;
    overflow:hidden;
}
.tained-title{
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}
.showtable-learn{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 1%;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;
    /* border: 1px solid #ececec; */
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
            <Navbar_member botID = {props.match.params.bot_id} path={"trained"}  />
            <div className="container">
              
                <div className="container-top d-flex bd-highlight">                   
                    <div className="tained-title"> 
                        <h2 className=' p-2 flex-grow-1 bd-highlight'>Trained</h2>
                    </div>
                    {/* <div className="p-2 bd-highlight">
                        <button className="btn btn-danger" type="button" onClick = {() => delete_trained(props.match.params.bot_id) } >Delete</button>
                    </div> */}
                    {/* <div className="p-2 bd-highlight">
                        <Link to={'/bot/'+props.match.params.bot_id+'/training'}>
                            <button className="btn btn-success" type="button">Training</button>
                        </Link>
                    </div> */}
                </div>
                <div className="showtable-learn">
                    <Table botID={props.match.params.bot_id} delete_trained={delete_trained}  />
                </div>
                
            </div>

            </div>
                
        </Styles>
    );

}

export default Learned;