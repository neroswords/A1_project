import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, usePagination, useRowSelect } from 'react-table'
import { matchSorter } from 'match-sorter'
import { Container } from "react-bootstrap";

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
      padding-left: 15px;
      width:300px;
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
  .buttonadd-Group{
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 25px;
  border: 1px solid #0078ff;
  transition: 0.5s;
  background-color: #0078ff;
  color: #fff;
}
.buttonadd-Group:hover{
  color: #000;
}
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


function TableShow({ columns, data, updateMyData, skipPageReset, delete_trained, botID ,loading }) {
  
  const Ondelete = (e) => {
    if(e.length > 0){
      openDelete_table(e)
    }
    else{
      alert('please select')
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
  const [showAddGroup, setShowAddGroup] = useState(false);
  const openAddGroup = () => {
    setShowAddGroup(prev => !prev);
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
  console.log(selectedFlatRows)
  return (
    <>
      <Container>
        <div className="button-trained-word">
          <div className='SearchBar'>
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>

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
                             console.log(row)
                             return (
                               <tr {...row.getRowProps()}>
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
    </>
  )
}




function TableGroup({ botID, delete_trained, add_data }) {
  const [TableGroupState, setTableGroupState] = useState([]);
                                                        
  const [showAddGroup, setShowAddGroup] = useState(false);
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'Date', // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'Name', // accessor is the "key" in the data
      },
      {
        Header: 'Income',
        accessor: 'Income', // accessor is the "key" in the data
      },
      {
        Header: 'Tracking Number',
        accessor: 'TrackingNumber', // accessor is the "key" in the data
      },
      
      
    ],
    []
  )

  const [originalData] = React.useState(TableGroupState)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  
//   const openAddGroup = () => {
//     setShowAddGroup(prev => !prev);

//   }


const [loading,setLoading] = useState(false);

  useEffect(() => {
    fetch('/bot/' + botID + '/totalorder')
      .then(res => res.json().then(data => {
        console.log(data)

        setTableGroupState(
          data.map(d => {
            console.log(d)
            return {
              select: false,
              Date: d.purchase_day+'/'+ d.purchase_month +'/'+ d.purchase_year,
              Name: d.username,
              Income: d.total,
              TrackingNumber: d.TrackingNo

            };
          })
          

        )
        setLoading(true);

      }))

  }, []);


  const resetData = () => setTableGroupState(originalData)
  
  return (
    <Styles>
      <div className="table-show-all">
        <TableShow
          columns={columns}
          data={TableGroupState}
          // updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          delete_trained={delete_trained}
          botID={botID}
          loading = {loading}
        />
      </div>
    </Styles>
  );
}

export default TableGroup;