import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Button} from 'react-bootstrap';
import {AddWord} from './AddTable/AddWord';
import { AddStyle } from "./AddStyle";


const Styles = styled.div`
.table{
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 0.9em;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
}

.table thead tr{
  text-align: left;
  font-weight: bold;
  border: none;
}

.table th,
.table td{
  padding: 12px 15px;
  border: none;
}

.table tbody tr{
  border-bottom: 1px solid #dddddd;
}

.table tbody tr:nth-of-type(even){
  background-color: #e5e5e5;
}

.buttonaddWord{
  min-width: 30px;
  padding: 5px 10px;
  border-radius: 4px;
  border: none;
  background: #ffc15e;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
`;

function Tablecon({botID}) {
  const [TableconState, setTableconState] = useState([]);
  const [showWord, setShowWord] = useState(false);


 const openWord = () => {
    setShowWord(prev => !prev);
  }

  useEffect(() => {
    fetch('/bot/'+botID+'/training')
    .then(res => res.json().then(data => {
      setTableconState(
        data.map(d => {
          console.log(d)
          return {
            select: false,
            id: d._id.$oid,
            Word: d.answer,
            ReplyWord: d.question,
            Confidence : d.confident
          };
        })
      );
    }))
    
  }, []);

  return (
    <Styles>
    <div className="container">
          <Button className='buttonaddWord' onClick={openWord}>Add Word</Button>
          <AddWord showWord={showWord} setShowWord={setShowWord} botID = {botID}/>
          <AddStyle />
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                onChange={e => {
                  let checked = e.target.checked;
                  setTableconState(
                    TableconState.map(d => {
                      d.select = checked;
                      return d;
                    })
                  );
                }}
              ></input>
            </th>
            <th scope="col">Word</th>
            <th scope="col">Reply Word</th>
            <th scope="col">Confidence</th>
            
          </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Search</th>
                <td>
                <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                </td>
                <td>
                <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-success" type="submit">Search</button>
                </form>  
                </td>
                <td>Avg</td>
                
            </tr>
          {TableconState.map((d, i) => (
            <tr key={d.id}>
              <th scope="row">
                <input
                  onChange={event => {
                    let checked = event.target.checked;
                    setTableconState(
                      TableconState.map(data => {
                        if (d.id === data.id) {
                          data.select = checked;
                        }
                        return data;
                      })
                    );
                  }}
                  type="checkbox"
                  checked={d.select}
                ></input>
              </th>
              <td>{d.Word}</td>
              <td>{d.ReplyWord}</td>
              <td>{d.Confidence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Styles>
  );
}

export default Tablecon;