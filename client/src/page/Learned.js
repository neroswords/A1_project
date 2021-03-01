import React, { useState, useEffect } from "react";
import Table from '../Components/Table/Table';
import Navbar_member from '../Components/Navbar/navbar_member';
import styled from 'styled-components';

const Styles = styled.div` 
.learned-page {
    display: flex;
}
.container {
    margin-top: 10px;
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
    
    const add_data = (data) =>{
        deleteState.push(data)
        console.log(deleteState)
    }
    const id = (data) =>{
        console.log(id.botID)
    }

    const delete_trained = (data) => {
        // setShowDelete_table(prev => !prev)
        console.log(data)
          var newdata = []
          var i = 0
          for (i = 0; i < data.length; i++){
              newdata.push(data[i].original)
          }
          
          console.log(newdata)
          
          if (data[0]){
              fetch('/train_bot/delete/trained/'+data[0].original.id, {
                  method : 'POST',
                  headers : {
                      "Access-Control-Allow-Origin": "*",
                      'Content-Type':'application/json'
                      },
                      body : JSON.stringify(newdata),
                  });
                  console.log(data)
                  window.location.reload("bot/"+id+'/trained');
          }    
      
    }
    


    return(
        <Styles>
        <div className="learned-page">
            <Navbar_member botID = {props.match.params.bot_id} path={"trained"}  />
            <div className="container">
              
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Trained</h2>
                </div>
                <hr></hr>
                <Table botID={props.match.params.bot_id} delete_trained={delete_trained}/>
            </div>

            </div>
                
        </Styles>
    );

}

export default Learned;