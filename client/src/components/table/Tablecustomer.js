import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import { matchSorter } from 'match-sorter'
import { Container } from "react-bootstrap";
import {Link} from "react-router-dom";



const Styles = styled.div`

  table {
    /* font-family: 'Roboto',sans-serif; */
    margin: 3% 0;
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
      width: 500px;
    }
    td {
      font-family: 'Public Sans', sans-serif;
      font-weight: 0;
      margin: 0;
      padding: 12px 15px;
      border: 1px solid #efeff5;
      font-size: 16px;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 50px;
        padding: 0;
        margin: 0;
        border: 0;
        /* text-align: center; */
      }
    }

  .customer_input{
    background-color: transparent;
    border-radius: 25px;
    padding-left:15px;
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


  /* .button-trained-word .buttondeleteWord:hover{
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
} */

.pagination{
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
`;


// const IndeterminateCheckbox = React.forwardRef(

//   ({ indeterminate, ...rest }, ref) => {
//     const defaultRef = React.useRef()
//     const resolvedRef = ref || defaultRef

//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate
//     }, [resolvedRef, indeterminate])

//     return (
//       <>
//         <input type="checkbox" ref={resolvedRef} {...rest} />
//       </>
//     )
//   }
// )



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



  return <input className="customer_input" value={value} onChange={onChange} onBlur={onBlur} />
}

const defaultColumn = {
  Cell: EditableCell
}


function TableShow({ columns, data, updateMyData, skipPageReset, delete_trained, botID }) {
  
  const Ondelete = (e) => {
    delete_trained(e)
    
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
      // defaultColumn,
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

        // {
        //   id: 'selection',
        //   Header: ({ getToggleAllPageRowsSelectedProps }) => (
        //     <div>
        //       <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />

        //     </div>
        //   ),

        //   Cell: ({ row }) => (

        //     <div >

        //       <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />


        //     </div>
        //   ),

        // },
        ...columns,

      ])
    }

  )
  console.log(selectedFlatRows)
  return (
    <>
      <Container>
        <div className="button-trained-word">
          {/* <Button className='buttonaddWord' onClick={openWord}>Add Word</Button> */}
          {/* <button className="buttondeleteWord" variant="danger" onClick={() => Ondelete(selectedFlatRows)}>Delete</button> */}
          <div className='SearchBar'>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
          {/* <AddWord showWord={showWord} setShowWord={setShowWord} botID={botID} /> */}
        </div>

        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}

                  </th>
                ))}
                {/* <th>Chat</th> */}
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
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
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
    </>
  )
}




function Tablecustomer({ botID, delete_trained, add_data }) {
  const [TablecustomerState, setTablecustomerState] = useState([]);

                                                        
  const [showWord, setShowWord] = useState(false);


  const columns = React.useMemo(
    () => [
      {
        Header: 'UserName',
        accessor: 'UserName', // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'Name',
        filter: 'fuzzyText',
      },
      {
        Header: 'Address',
        accessor: 'Address',
      },
    ],
    []
  )

  const [originalData] = React.useState(TablecustomerState)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    setTablecustomerState(old =>
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
    fetch('/bot/' + botID + '/customer')
      .then(res => res.json().then(data => {
        console.log(data)

        setTablecustomerState(
          data.map(d => {
            return {
              select: false,
              id: d._id.$oid,
              UserName: d.display_name,
              Name: d.fullname,
              Address: d.address

            };
          })
          

        );

      }))

  }, []);


  const resetData = () => setTablecustomerState(originalData)
  console.log(TablecustomerState)
  return (
    <Styles>
      <TableShow
        columns={columns}
        data={TablecustomerState}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        delete_trained={delete_trained}
        botID={botID}
      />

    </Styles>
  );
}

export default Tablecustomer;
