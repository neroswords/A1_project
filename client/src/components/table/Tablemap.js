import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const Styles = styled.div`
.table{
  border-collapse: collapse;
  margin: 10px 0;
  font-size: 0.9em;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  // box-shadow: 0 0 10px rgba(0, 0, 0.15);
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
`;

function Tablemap() {
  const [TablemapState, setTablemapState] = useState([]);

  useEffect(() => {
    let TablemapState = [
        { id: 1, Word: "hiii", ReplyWord: "may i help u" },
        { id: 2, Word: "heyy", ReplyWord: "may i help u" },
        { id: 3, Word: "hello", ReplyWord: "may i help u" }
    ];

    setTablemapState(
      TablemapState.map(d => {
        return {
          select: false,
          id: d.id,
          Word: d.Word,
          ReplyWord: d.ReplyWord,
          
         
        };
      })
    );
  }, []);

  return (
    <Styles>
    <div className="container">
      
        <button
          type="button"
          className="btn btn-primary btn-sm float-right my-3"
        >
          Add
        </button>
      
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                onChange={e => {
                  let checked = e.target.checked;
                  setTablemapState(
                    TablemapState.map(d => {
                      d.select = checked;
                      return d;
                    })
                  );
                }}
              ></input>
            </th>
            <th scope="col">Word</th>
            <th scope="col">Reply Word</th>
            <th scope="col">Link</th>
            
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
                <td></td>
                
            </tr>
          {TablemapState.map((d, i) => (
            <tr key={d.id}>
              <th scope="row">
                <input
                  onChange={event => {
                    let checked = event.target.checked;
                    setTablemapState(
                      TablemapState.map(data => {
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
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Styles>
  );
}

export default Tablemap;