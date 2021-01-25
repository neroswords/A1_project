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
  }
  .container {
    margin-top: 2%;
  }
`;

function Train(props) {
  let history = useHistory();

  const [deleteState, setdeleteState] = useState([]);

  const delete_trained = (data) => {
    const delete_data = deleteState;
    if (deleteState[0]) {
      fetch("/train_bot/delete/training/" + data, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(delete_data),
      });
      window.location.reload("bot/" + deleteState.bot_id + "/trained");
    }
  };
  const add_data = (data) => {
    deleteState.push(data);
  };

  return (
    <Styles>
      <div className="train-page">
        <Navbar_member botID={props.match.params.bot_id} />
        <div className="container">
          <div className="container-top d-flex bd-highlight">
            <h2 className="p-2 flex-grow-1 bd-highlight">Trainning</h2>
            <div className="p-2 bd-highlight">
              {/* <button className="btn btn-danger" type="button">
                            Delete
                        </button> */}
              <DeleteModal
                dataType={"training"}
                dataID={props.match.params.bot_id}
                delete_trained={delete_trained}
                add_data={add_data}
              />
            </div>
            <div className="p-2 bd-highlight">
              {/* <Link to={'/bot/'+props.match.params.bot_id+'/trained'}>
                            <button className="btn btn-success" type="button">Trained</button>
                        </Link> */}
            </div>
          </div>
          <hr></hr>
          <Tablecon
            botID={props.match.params.bot_id}
            delete_trained={delete_trained}
            add_data={add_data}
          />
        </div>
      </div>
    </Styles>
  );
}

export default Train;
