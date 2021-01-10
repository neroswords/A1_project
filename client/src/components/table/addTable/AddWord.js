import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function AddWord(props) {
  const onSave = e => {
    let Word = e.target[0].value;
    let ReplyWord = e.target[1].value;
    
    let data = {
        Word,
        ReplyWord
      
    };
    AddWord(data);
  };

  const AddWord = data => {
    axios
      .post("/train", data)
      .then(d => {
        console.log(d);
        props.history.push("/");
      })
      .catch(er => alert(er));
  };
  return (
    <div className="container my-3">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSave(e);
        }}
      >
        <div className="form-group">
          <label>Word</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="form-group">
          <label>Reply Word</label>
          <input type="text" className="form-control" required />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default withRouter(AddWord);
