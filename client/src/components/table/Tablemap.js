import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import { matchSorter } from 'match-sorter'
import { Container } from "react-bootstrap";

import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import Delete_table from "../Delete_table";


const Styles = styled.div`

  table {
    margin: 10px 0;
    font-size: 1.2em;
    text-align: center;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 12px 15px;
      border-bottom: 1px solid #DADADA;
      border-right: 1px solid #DADADA;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 0.9rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }

  .trained-Word{
    background-color: transparent;
    border-radius: 25px;
    padding-left:15px;
  }

}

.table tbody tr:nth-of-type(even){
        background-color: #e5e5e5;
    }

.button-trained-word .buttondeleteWord{
    padding: 7px 15px !important;
    font-size: 12px !important;
    border-radius: 25px !important;
    border: 1px solid #CD5C5C ;
    transition: 0.5s;
    background-color: #CD5C5C;
    color: #fff ;
    margin-left: 15px;
  }


  .button-trained-word .buttondeleteWord:hover{
    color: #000;
  }

  .buttonaddMapping{
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 25px;
  border: 1px solid #0078ff;
  transition: 0.5s;
  background-color: #0078ff;
  color: #fff;
}

.buttonaddMapping:hover{
  color: #000;
}

.pagination{
 margin-bottom: 0;
}

.parginate-text{
  padding-top: 7px;
  margin-right: 1%;
  margin-left: 1%;
}

.pagination button{
  border-radius: 15px;
  width: 35px;
  height: 35px;
  background-color: transparent;
  margin-left: .5%;
  border: none;
}

.pagination button:hover{
  border-radius: 30px;
  background-color: #fca311;
  color: #000;
}

.searchBox{
  width: 130px;
  height: 30px;
  border-radius: 25px;
  border: .5px solid #A9A9A9;

}

input::placeholder{
  padding-left:15px;

}

.button-trained-word .SearchBar{
  position:relative;
  float: right;
}

  
`;


const IndeterminateCheckbox = React.forwardRef(

  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)



function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {

  const count = preGlobalFilteredRows.length

  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)


  return (
    <span>
      Search:{' '}
      <input
        className="searchBox"
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={` ${count} records...`}
        style={{
          fontSize: '0.8rem',
          // marginLeft: '1rem'
        }}
      />
    </span>
  )
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = val => !val

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {

  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)

  }

  const onBlur = () => {
    updateMyData(index, id, value)
    // console.log("test")
  }


  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])



  return <input className="trained-Word" value={value} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
  // Cell: EditableCell
}


function TableShow({ columns, data, updateMyData, skipPageReset, delete_trained, botID }) {
  // console.log(data)
  const Ondelete = (e) => {
    // delete_trained(e)
    openDelete_table(e)
  }

  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumnFilter = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )
  const [showWord, setShowWord] = useState(false);
  const openWord = () => {
    setShowWord(prev => !prev);
  }

  const [showDelete_table, setShowDelete_table] = useState(false);
  const openDelete_table = (data) => {
    setShowDelete_table(prev => !prev);
      
  }
 

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      defaultColumnFilter, // Be sure to pass the defaultColumn option
      filterTypes,
      autoResetPage: !skipPageReset,

      updateMyData,

    },

    useFilters, // useFilters!
    useGlobalFilter,
    usePagination,
    useRowSelect,

    hooks => {
      hooks.visibleColumns.push(columns => [

        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />

            </div>
          ),

          Cell: ({ row }) => (

            <div >

              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />


            </div>
          ),

        },
        ...columns,

      ])
    }

  )
  // console.log(selectedFlatRows)
  return (
    <>
      <Container>
        <div className="button-trained-word">
          {/* {console.log(botID)} */}
          {/* <Link to ={'/bot/'+botID+'/mapping/create'} ><Button className='buttonaddMapping' >Create Mapping</Button></Link> */}
          {/* <button className="buttondeleteWord" variant="danger" onClick={() => Ondelete(selectedFlatRows)}>Delete</button> */}
          <div className='SearchBar'>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
          <Delete_table showDelete_table={showDelete_table} setShowDelete_table={setShowDelete_table} selectedFlatRows={selectedFlatRows} id={botID} delete_trained={delete_trained}/>
        </div>




        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}

                  </th>
                 
                ))} <th>Link</th>
              </tr>

            ))}
            {/* <tr>
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: 'right',
                }}
              >

              </th>
            </tr> */}
          </thead>
          <tbody {...getTableBodyProps()}>
          {/* {  console.log(page[0]) } */}
            {page.map((row, i) => {
              prepareRow(row)
              // console.log(row)
              return (  
                
                <tr {...row.getRowProps()}>
                   
                  {row.cells.map(cell => {
                    //  console.log(cell.row.original.id)
                    return (
                    <><td {...cell.getCellProps()}>{cell.render('Cell')} </td>
                    {/* <td><Link to ={'/bot/'+botID+'/mapping/'+cell.row.original.id} ><i className="far fa-edit" ></i></Link></td> */}
                    </>
                    )
                    
                  }
                  
                  )} 
                  
                      <td><Link to ={'/bot/'+botID+'/mapping/details/'+row.original.id} ><i className="far fa-edit" ></i></Link></td>
                 
                 
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span className='parginate-text'>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            {' '}

          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 25, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

        </div>
      </Container>
    </>
  )
}




function Tablemap({ botID, delete_trained, add_data }) {
  const [TablemapState, setTablemapState] = useState([]);

  // console.log(botID)                                               

  const [showWord, setShowWord] = useState(false);


  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'Name', // accessor is the "key" in the data
      },
      {
        Header: 'ReplyWord',
        accessor: 'ReplyWord',
        // filter: 'fuzzyText',
      },

      

    ],
    []
  )

  const [originalData] = React.useState(TablemapState)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    setTablemapState(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          const editData = {
            "value": value,
            "type": columnId,
            "data": row
          }
          if (row.Word != value && row.ReplyWord != value) {
            fetch('/train_bot/edit/trained/', {
              method: 'POST',
              headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(editData)
            })
          }
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  const openWord = () => {
    setShowWord(prev => !prev);

  }

  useEffect(() => {
    fetch('/mapping/' + botID)
      .then(res => res.json().then(data => {
        setTablemapState(
          data.map(d => {
            // console.log(d.details[0].answer)
            return {
              
              select: false,
              id: d._id.$oid,
              Name: d.name,
              ReplyWord: d.details[0].answer,
             
            };
          })
          

        );

      }))

  }, []);

 
  return (
    <Styles>
      <TableShow
        columns={columns}
        data={TablemapState}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        delete_trained={delete_trained}
        botID={botID}
        // mapID ={TablemapState[0].id}
      />

    </Styles>
  );
}

export default Tablemap;


