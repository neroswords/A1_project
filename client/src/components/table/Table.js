import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {Button} from 'react-bootstrap';
import {AddWord} from './AddTable/AddWord';
import { AddStyle } from "./AddStyle";

import { useTable,useFilters, useGlobalFilter, useAsyncDebounce, usePagination,useRowSelect   } from 'react-table'
import {matchSorter} from 'match-sorter'


const Styles = styled.div`

padding: 1rem;

  table {
    border-spacing: 0;
    

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
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
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
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a default UI for filtering
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

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
    
  }


  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
    console.log("test")
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  

  return <input value={value} onChange={onChange} onBlur={onBlur}  />
}
// Set our editable cell renderer as the default Cell renderer

const defaultColumn = {
   Cell: EditableCell
}


function TableShow({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
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
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    
    useFilters, // useFilters!
    useGlobalFilter,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

 
  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()} className="table">
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
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'right',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
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
        <span>
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
    </>
  )
}




function Table({botID,delete_trained,add_data}) {
  const [TableState, setTableState] = useState([]);
  
  
 
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
    ],
    []
  )
 

  

  
  // const data = React.useMemo(
  //   () => TableState
  // )
  // const [data, setData] = TableState
  const [originalData] = React.useState(TableState)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setTableState(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          const editData = {
            "value" : value,
            "type" : columnId,
            "data" : row
          }
          if(row.Word != value && row.ReplyWord != value)
          {
          fetch('/train_bot/edit/trained/', {
            method : 'POST',
            headers : {
                  "Access-Control-Allow-Origin": "*",
                  'Content-Type':'application/json'
            },
            body: JSON.stringify(editData)})
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
  // const submitEdit = () =>{
  //   fetch
  // }

  const openWord = () => {
    setShowWord(prev => !prev);
  
  }
//   const delete_trained =(data)=>{
//     const delete_data = deleteState
//     fetch('/bot/delete/'+data, {
//     method : 'POST',
//     headers : {
//         "Access-Control-Allow-Origin": "*",
//         'Content-Type':'application/json'
//         },
//         body : JSON.stringify(delete_data),
//     });
//     console.log(data)
// }
 

  useEffect(() => {
    setSkipPageReset(false)
    fetch('/bot/'+botID+'/trained')
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
      );
    }))
    
  }
  
  , []);
  

  const resetData = () => setTableState(originalData)

  return (
    
    
    <Styles>
      <TableShow
        columns={columns}
        data={TableState}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
     
    </Styles>
  );
}

export default Table;