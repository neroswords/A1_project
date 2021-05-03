import React, { useState, useEffect, useHistory } from "react";
import styled from 'styled-components';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import { matchSorter } from 'match-sorter'
import { Container } from "react-bootstrap";
import { AddWord } from "./AddTable/AddWord";
import { Button } from 'react-bootstrap';
import Delete_table from "../Delete_table";
import { MDBNotification, MDBContainer } from "mdbreact";


const Styles = styled.div`
  .table-show-all > div.container {
    /* max-width: max-content; */
    margin: 0;
    padding: 20px;
    min-width: 100% ;
  }

  table {
    /* font-family: 'Roboto',sans-serif; */
    width: 100%;
    margin: 1% 0;
    font-size: 1em;
    text-align: center;
    border: 1px solid #efeff5; 
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th{
      margin: 0;
      /* padding: 12px 15px; */
      border: 1px solid #efeff5;
      background-color: #393939;
      color: white;
    }
    td {
      font-family: 'Public Sans', sans-serif;
      margin: 0;
      padding: 12px 15px;
      border: 1px solid #efeff5;
      font-size: 16px;

      :last-child {
        border-right: 0;
      }
      input {
        text-align: center;
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
    width: 400px;
  }
}
.table tbody tr:nth-of-type(even){
        background-color: #fafafc;
    }
.button-trained-word .buttondeleteWord{
    padding: 7px 20px !important;
    font-size: 12px !important;
    border-radius: 25px !important;
    border: 1px solid #CD5C5C ;
    transition: 0.5s;
    background-color: #CD5C5C;
    color: #fff ;
    margin-left: 1%;
  }
  .button-trained-word .buttondeleteWord:hover{
    color: #000;
  }
  .buttonaddWord{
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 25px;
  border: 1px solid #0078ff;
  transition: 0.5s;
  background-color: #0078ff;
  color: #fff;
}
.buttonaddWord:hover{
  color: #000;
}
.pagination{
  justify-content:space-between;
  width:100%;
  margin-bottom: 0;
}
.parginate-text{
  display:inline;
  padding-top: 7px;
  margin-right: 1%;
  margin-left: 1%;
}

.parginate-arrow{
  text-align:right;
}

.pagination button{
  border-radius: 15px;
  width: 35px;
  height: 35px;
  background-color: transparent;
  margin-left: 0.5%;
  border: none;
}
.pagination button:hover{
  border-radius: 30px;
  background-color: #fca311;
  color: #000;
}
.searchBox{
  width: 190px;
  height: 30px;
  border-radius: 1rem;
  border: .5px solid #A9A9A9;
}
input::placeholder{
  padding-left:15px;
}
.button-trained-word .SearchBar{
  position:relative;
  float: right;
}
.select-pagesize {
  padding: 0 1%;
}

/* .show-number-pagination{
  z-index: -10;
} */
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
    console.log("test")
  }


  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])



  return <input className="trained-Word" value={value} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
  Cell: EditableCell
}


function TableShow({ columns, data, updateMyData, skipPageReset, delete_trained ,botID,loading }) {
  const Ondelete = (e) => {
    setErrorState(false)
    if(e.length > 0){
      openDelete_table(e)
    }
    else{
      setErrorState(true)
    }
    console.log(e.length)
   
    // delete_trained(e)

  }

  // const delete_table =(id)=>{
  //   fetch('/train_bot/delete/training/id'+id,{
  //     method : 'POST',
  //     headers : {
  //         "Access-Control-Allow-Origin": "*",
  //         'Content-Type':'application/json'
  //     },
  //   });
  // }

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
      // Let's set up our default Filter UI
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
    console.log('111k')
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

  // const handleClick =()=> {
  //   history.push('/bot/'+botID+'/trained')   
  // }

  return (
    <>
      <Container>
      { errorState &&  
            <div className="errorstate">

                              
                                  <MDBNotification
                                  style={{
                                    // width: "auto",
                                    position: "absolute",
                                    // top: "10px",
                                    // left: "500px",
                                    zIndex: 9999
                                  }}
                                  // autohide={3000}
                                  bodyClassName="p-4 font-weight-bold white-text "
                                  className="stylish-color-dark position-absolute top-0 start-50 translate-middle-x"
                                  closeClassName="blue-grey-text"
                                  fade
                                  icon="bell"
                                  iconClassName="text-danger"
                                  message="Please select word to delete"
                                  show
                                  
                                  title="Error"
                                  titleClassName="elegant-color-dark white-text"
                    
                                  />
                                </div>

                                }
        <div className="button-trained-word">
          <Button className='buttonaddWord' onClick={openWord}>Add Word</Button>
          <button className="buttondeleteWord" onClick={() => Ondelete(selectedFlatRows)} >Delete</button>
          <div className='SearchBar'>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
        />
        </div>
          <AddWord showWord={showWord} setShowWord={setShowWord} botID = {botID}/>
          <Delete_table showDelete_table={showDelete_table} setShowDelete_table={setShowDelete_table} selectedFlatRows={selectedFlatRows} id={botID} delete_trained={delete_trained}/>
        </div>

        
        
        
        <table {...getTableProps()} className="table" name="trained-table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}

                  </th>
                ))}
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
          {loading ?                    
                    
                    <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()} name="training-row">
                          {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          })}
                        </tr>
                      )
                    })}
                  </tbody> 
                    : <div class="loader"></div>}

        </table>
        <div className="pagination">
        <div className="parginate-tex col">
              <span >
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </span>
              <span>
                {' '}
              </span>{' '}
              <select className="select-pagesize"
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
          <div className="parginate-arrow col">
                <button  onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {<i class="fad fa-chevron-double-left"></i>}
                </button>{' '}
                <button  onClick={() => previousPage()} disabled={!canPreviousPage}>
                  {<i class="fad fa-chevron-left"></i>}
                </button>{' '}
                <button  onClick={() => nextPage()} disabled={!canNextPage}>
                  {<i class="fas fa-chevron-right"></i>}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  {<i class="fas fa-chevron-double-right"></i>}
                </button>{' '}
          </div>
          {/* <p>Selected Rows: {Object.keys(selectedRowIds).length}</p> */}


          {/* <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre> */}

        </div>
      </Container>
    </>
  )
}




function Table({ botID, delete_trained, add_data }) {
  const [TableState, setTableState] = useState([]);
  const [loading,setLoading] = useState(false);


  const [showWord, setShowWord] = useState(false);
  const [showDelete_table, setShowDelete_table] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Word',
        accessor: 'Word', // accessor is the "key" in the data
      },
      {
        Header: 'ReplyWord',
        accessor: 'ReplyWord',
        filter: 'fuzzyText',
      },
    ],
    []
  )

  const [originalData] = React.useState(TableState)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    setTableState(old =>
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
    setSkipPageReset(false)
    fetch('/train_bot/' + botID + '/trained')
      .then(res => res.json().then(data => {
        setTableState(
          data.map(d => {

            return {
              select: false,
              id: d._id.$oid,
              Word: d.question,
              ReplyWord: d.answer
            };
          })
        );setLoading(true)
      }))

  }

    , []);


  const resetData = () => setTableState(originalData)

  return (
    
      <Styles>
        <div className="table-show-all">
        {loading ?   
        <TableShow
          columns={columns}
          data={TableState}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          delete_trained={delete_trained}
          botID={botID}
          loading={loading}
          />   : <div class="loader"></div>}
      </div>
    </Styles>
  );
}

export default Table;