import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import  { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect,useResizeColumns } from 'react-table'
import { matchSorter } from 'match-sorter'
import { Container } from "react-bootstrap";
import Delete_table from "../Delete_table";
import Traintable from "../Traintable";
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

    th {
      margin: 0;
      /* padding: 12px 15px; */
      border: 1px solid #efeff5;
      background-color: #393939;
      color: white;
      /* width: 500px; */
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
        font-size: 0.9rem;
        padding: 0;
        margin: 0;
        border: 0;
        text-align: center;
        /* width: 400px; */
      }
    }

  .trained-Word{
    background-color: transparent;
    border-radius: 25px; 
    padding-left:15px;
    width: 300px;
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
    margin-top: 5px;
  }


  .button-trained-word .buttondeleteWord:hover{
    color: #000;
  }

  .buttonaddtrain{
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 25px;
    border: 1px solid #34a853;
    transition: 0.5s;
    background-color: #34a853;
    color: #fff;
}

.buttonaddtrain:hover{
  color: #000;
}

.pagination{
  z-index : -1;
  justify-content:space-between;
  width:100%;
  margin-bottom: 0;
}

.pagination .parginate-text{
  display:inline;
  padding-top: 7px;
  margin-right: 1%;
  margin-left: 1%;
}

.parginate-arrow{
  text-align:right;
}

.parginate-arrow  button{
  border-radius: 15px;
  width: 35px;
  height: 35px;
  background-color: transparent;
  margin-left: 0.5%;
  border: none;
}

.parginate-arrow  button:hover{
  border-radius: 30px;
  background-color: #fca311;
  color: #000;
}


.searchBox{
  width: 190px;
  height: 30px;
  border-radius: 1rem;
  border: 0.5px solid #A9A9A9;
  margin: 5px 0;
}

input::placeholder{
  padding-left:15px;

}

.button-trained-word .SearchBar{
  float: right;
}

.select-pagesize {
  padding: 0 1%;
}
.loader {
  animation:spin 1s infinite linear;
  border:solid 2vmin transparent;
  border-radius:50%;
  border-right-color:#fca311;
  border-top-color:#fca311;
  box-sizing:border-box;
  height:20vmin;
  left:calc(50% - 10vmin);
  position:fixed;
  top:calc(50% - 10vmin);
  width:20vmin;
  z-index:1;
  &:before {
    animation:spin 2s infinite linear;
    border:solid 2vmin transparent;
    border-radius:50%;
    border-right-color:#fcc111;
    border-top-color:#fcc111;
    box-sizing:border-box;
    content:"";
    height:16vmin;
    left:0;
    position:absolute;
    top:0;
    width:16vmin;
  }
  &:after {
    animation:spin 3s infinite linear;
    border:solid 2vmin transparent;
    border-radius:50%;
    border-right-color:#fcd111;
    border-top-color:#fcd111;
    box-sizing:border-box;
    content:"";
    height:12vmin;
    left:2vmin;
    position:absolute;
    top:2vmin;
    width:12vmin;
  }
}

@keyframes spin {
  100% {
    transform:rotate(360deg);
  }
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
        name="training-search" />
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
  }


  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])



  return <input className="trained-Word" value={value} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
  Cell: EditableCell
}


function TableShow({ columns, data, updateMyData, skipPageReset, delete_trained, botID ,loading, setReload}) {

  const [errorState, setErrorState] = React.useState(false)

  const Ondelete = (e) => {
    setErrorState(false)
    if(e.length > 0){
      
      openDelete_table(e)
    }
    else{
      setErrorState(true)
    }
    console.log(e.length)
  }

  const OnTrain = (e) => {
    console.log(e)
    if(e.length > 0){
      openTraintable(e)
    }
    else{
      setErrorState(true)
    }
    console.log(e.length)
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
  const [showTraintable, setShowTraintable] = useState(false);
  
  

  const [showDelete_table, setShowDelete_table] = useState(false);
  const openDelete_table = (data) => {
    setShowDelete_table(prev => !prev);
      
  }

  const openTraintable = (data) => {
    console.log(data)
    setShowTraintable(prev => !prev);
    console.log(showTraintable)
      
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
  return (
      
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
                                  autohide={3000}
                                  bodyClassName="p-4 font-weight-bold white-text "
                                  className="stylish-color-dark position-absolute top-0 start-50 translate-middle-x"
                                  closeClassName="blue-grey-text"
                                  fade
                                  icon="bell"
                                  iconClassName="text-danger"
                                  message="Please select word"
                                  show
                                  
                                  title="Error"
                                  titleClassName="elegant-color-dark white-text"
                    
                                  />
                                </div>

                                }
        <div className="button-trained-word">
          <button className="buttonaddtrain" name="btn-delword" onClick={() => OnTrain(selectedFlatRows)}>Train</button>
          <button className="buttondeleteWord" name="btn-delword" variant="danger" onClick={() => Ondelete(selectedFlatRows)}>Delete</button>
          <div className='SearchBar'>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
          <Traintable showTraintable={showTraintable} setShowTraintable={setShowTraintable} selectedFlatRows={selectedFlatRows} id={botID} setReload={setReload} />
          <Delete_table showDelete_table={showDelete_table} setShowDelete_table={setShowDelete_table} selectedFlatRows={selectedFlatRows} id={botID} delete_trained={delete_trained}/>
        </div>


        <table {...getTableProps()} className="table" name="training-table">
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

        <div className="pagination row">
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

        </div>
      </Container>
    
  )
}




function Tablecon({ botID, delete_trained, add_data,setReload }) {
  const [TableconState, setTableconState] = useState([]);
  const [loading,setLoading] = useState(false);
                                                          

  const [showWord, setShowWord] = useState(false);


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
      {
        Header: 'Confidence',
        accessor: 'Confidence',
        
      },
    ],
    []
  )

  const [originalData] = React.useState(TableconState)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    setTableconState(old =>
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

  // const openWord = () => {
  //   setShowWord(prev => !prev);

  // }


  useEffect(() => {
    
    fetch('/train_bot/' + botID + '/training')
      .then(res => res.json().then(data => {
        setTableconState(
          data.map(d => {
            return {
              select: false,
              id: d._id.$oid,
              Word: d.question,
              ReplyWord: d.answer,
              Confidence: d.confident
            };
          })
          

        );
        setLoading(true)
      }))

  }, []);


  const resetData = () => setTableconState(originalData)
  return (
    <Styles>
      <div className="table-show-all">
 
         {loading ?                    
                    
                  
                    <TableShow 
          
                    columns={columns}
                    data={TableconState}
                    updateMyData={updateMyData}
                    skipPageReset={skipPageReset}
                    delete_trained={delete_trained}
                    botID={botID}
                    loading={loading}
                    setReload={setReload}
                  />   : <div class="loader"></div>}
      </div>
    </Styles>
  );
}

export default Tablecon;