import React, { useState, useEffect } from "react";
import Navbar_member from "../Components/Navbar/navbar_member";
import { Link } from "react-router-dom";
import DeleteModal from "../Components/delete_modal";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Tablecon from "../Components/Table/Tablecon";

const Styles = styled.div`
  .train-page {
    display: flex;
    min-height: 92vh;
  }
  
  .container {
    /* margin-top: 10px; */
    margin-top: 2%;
    overflow:hidden;
  }
  
  .training-title{
    /* font-family: 'Public Sans', sans-serif;    */
    padding: 4px;
    width: 100% ;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    padding: 0 1%;
  }


  .showtablecon{
    min-height: 70vh;
    margin-top: 1%;
    background-color: white;
    padding: 5px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.25rem;

  }
`

function Train(props) {
  let history = useHistory();
  const [deleteState, setdeleteState] = useState([]);
  const delete_trained =(data)=>{
    var newdata = []
    var i = 0

    // var a = []
    for (i = 0; i < data.length; i++){
        newdata.push(data[i].original)
    }
    if (data[0]){
        fetch('/train_bot/delete/training/'+data[0].original.id, {
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
  const add_data = (data) => {
    deleteState.push(data);
  };
  const id = (data) =>{
    console.log(id.botID)
}
  return (
    <Styles>
      <div className="train-page">
        <Navbar_member botID={props.match.params.bot_id} path={"training"} />
        <div className="container">
          <div className="training-title">
            <h2 className="p-2 flex-grow-1 bd-highlight">Trainning</h2>
          </div>
          {/* <div className=" d-flex bd-highlight">
          
            <div className="p-2 bd-highlight">
              <Link to={'/bot/'+props.match.params.bot_id+'/trained'}>
                            <button className="btn btn-success" type="button">Trained</button>
                        </Link>
            </div>
          </div> */}
          {/* <hr></hr> */}
          <div className="showtablecon">
          <Tablecon
            botID={props.match.params.bot_id} delete_trained={delete_trained}
          />
          </div>
        </div>
      </div>
      
    </Styles>
  );
}

export default Train;
