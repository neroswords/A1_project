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
}

.table th,
.table td{
  padding: 12px 15px;
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

function Table() {
  const [TableState, setTableState] = useState([]);
  const [showWord, setShowWord] = useState(false);

  const openWord = () => {
    setShowWord(prev => !prev);
  }

  useEffect(() => {
    let TableState = [
        { id: 1, Word: "hiii", ReplyWord: "may i help u" },
        { id: 2, Word: "heyy", ReplyWord: "may i help u" },
        { id: 3, Word: "hello", ReplyWord: "may i help u" }
    ];
  
    
    setTableState(
      TableState.map(d => {
        return {
          select: false,
          id: d.id,
          Word: d.Word,
          ReplyWord: d.ReplyWord
         
        };
      })
    );
  }, []);

  return (
    <Styles>
      <div className="container">
          <Button className='buttonaddWord' onClick={openWord}>Add Word</Button>
          <AddWord showWord={showWord} setShowWord={setShowWord} />
          <AddStyle />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  onChange={e => {
                    let checked = e.target.checked;
                    setTableState(
                      TableState.map(d => {
                        d.select = checked;
                        return d;
                      })
                    );
                  }}
                ></input>
              </th>
              <th scope="col">Word</th>
              <th scope="col">Reply Word</th>
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
                  
              </tr>
            {TableState.map((d, i) => (
              <tr key={d.id}>
                <th scope="row">
                  <input
                    onChange={event => {
                      let checked = event.target.checked;
                      setTableState(
                        TableState.map(data => {
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
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Styles>
  );
}

export default Table;