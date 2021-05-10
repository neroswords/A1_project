import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import { matchSorter } from 'match-sorter'
import { Container } from "react-bootstrap";

import { Button } from 'react-bootstrap';
import {Link} from "react-router-dom";
import Delete_table from "../Delete_table";


const Styles = styled.div`

.table-show-all > div.container { 
    /* max-width: max-content; */
    margin: 0 !important;
    /* padding: 20px; */
    min-width: 100% ;
  }

  table {
    font-family: 'Roboto',sans-serif;
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
        font-size: 0.9rem;
        padding: 0;
        margin: 0;
        border: 0;
        text-align: center;
      }
    }

  .trained-Word{
    background-color: transparent;
    border-radius: 25px;
    padding-left:15px;
    width: 300px;
  }

}

.buttondownload-pdf{
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 25px;
  border: 1px solid #0078ff;
  transition: 0.5s;
  background-color: #0078ff;
  color: #fff;
}
.buttondownload-pdf:hover{
  color: #000;
}

.table tbody tr:nth-of-type(even){
        background-color: #fafafc
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
  z-index : -1;
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
  border-radius: 25px;
  border: .5px solid #A9A9A9;
  margin: 15px 0;
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

.buttondownload-pdf{
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 25px;
  border: 1px solid #0078ff;
  transition: 0.5s;
  background-color: #0078ff;
  color: #fff;
}
.buttondownload-pdf:hover{
  color: #000;
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
      name="mapping-search" />
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


function TableShow({ columns, data, updateMyData, skipPageReset, delete_trained, botID ,loading}) {
  // console.log(data)
  const Ondelete = (e) => {
    // delete_trained(e)
    openDelete_table(e)
  }

  const pdfDownload = (filename) => {
    
    fetch("/file/pdf/"+filename)
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




        <table {...getTableProps()} className="table" name="mapping-table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}

                  </th>
                 
                ))} <th>PDF</th>
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
          {/* {  console.log(page[0]) } */}
            {page.map((row, i) => {
              prepareRow(row)
              // console.log(row)
              return (  
                
                <tr {...row.getRowProps()}>
                   
                  {row.cells.map(cell => {
                    console.log(cell)
                    //  console.log(cell.row.original.id)
                    return (
                    <><td {...cell.getCellProps()}>{cell.render('Cell')} </td>
                    {/* <td><Link to ={'/bot/'+botID+'/mapping/'+cell.row.original.id} ><i className="far fa-edit" ></i></Link></td> */}
                    </>
                    )
                    
                  }
                  
                  )} 
                  
                      {/* <td><Link to ={'/bot/'+botID+'/mapping/details/'+row.original.id} name="mapping-details"><i className="far fa-edit" ></i></Link></td> */}
                    <td><button className="buttondownload-pdf" onClick={(e) => {
                                                      e.preventDefault();
                                                      window.location.href='https://f13c53a01233.ngrok.io/file/pdf/'+row.original.File
                                                      }} >Download</button></td>
                 
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

        </div>
      </Container>
    </>
  )
}




function TableNewOrder({ botID, delete_trained, add_data }) {
  const [TableNewOrderState, setTableNewOrderState] = useState([]);

  // console.log(botID)                                               

  const [showWord, setShowWord] = useState(false);


  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'Date', // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'Name',
        // filter: 'fuzzyText',
      },
      {
        Header: 'Total',
        accessor: 'Total',
        // filter: 'fuzzyText',
      },
      
    ],
    []
  )

  const [originalData] = React.useState(TableNewOrderState)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    setTableNewOrderState(old =>
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

  const [loading,setLoading] = useState(false);
  useEffect(() => {
    fetch('/history/' + botID + '/waited')
      .then(res => res.json().then(data => {
        console.log(data)
        setTableNewOrderState(
          data.data.map(d => {
            console.log(d)
            return {
              select: false,
              id: d._id.$oid,
              Date: d.purchased_date.$date,
              Name: d.username,
              Total: d.total,
              File: d.file,

            };
          })
          

        )
        setLoading(true);

      }))

  }, []);

 
  return (
    <Styles>
      <div className="table-show-all">
      <TableShow
        columns={columns}
        data={TableNewOrderState}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        delete_trained={delete_trained}
        botID={botID}
        loading={loading}
        // mapID ={TablemapState[0].id}
      />
      </div>
    </Styles>
  );
}

export default TableNewOrder;


