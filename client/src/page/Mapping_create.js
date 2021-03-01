import React, { useEffect, useState,Fragment, useCallback } from 'react';
// import Table from '../Components/Table/Tablemap';
import Navbar_member from '../Components/Navbar/navbar_member';
import ReactFlow, { 
    addEdge,
    MiniMap,
    Controls,
    Background,
    getBezierPath, getMarkerEnd,
    ReactFlowProvider,
    removeElements,
    } from 'react-flow-renderer';


import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

const Styles = styled.div` 
.mapping-page {
    display: flex;
}
.container {
    margin-top:2%
}
.save__controls {
  z-index: 10;
  position: absolute;
}
` 
// make delete button and drop down change node type
const flowKey = 'example-flow';
const getNodeId = () => `randomnode_${+new Date()}`;
const initialElements = [
  { id: '1', type:'input', data: { label: 'Node 1' }, position: { x: 400, y: 100 } },
  // { id: '2', data: { label: 'Node 2' }, position: { x: 200, y: 200 } },
  // { id: 'e1-2', source: '1', target: '2' },
];


function Mapping_create(props){
  const style = {
    background: 'white',
    width: '100%',
    height: 300,
  };
  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  const [nodeName, setNodeName] = useState('Node 1');
  const [selectNode, setselectNode] = useState("1");
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));
  // const onElementClick = (elementsToClick) => {
  //   console.log(elementsToClick)
  // }


  const getIndex = (value, arr, prop) => {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

  const onSelectionChange = (ClickElements) => {
    console.log(ClickElements)
    if(ClickElements != null){
      // console.log(ClickElements)
      setselectNode(ClickElements[0].id)
      const index = getIndex(ClickElements[0].id, elements, 'id');
      // console.log(index)
      setNodeName(elements[index].data.label)
      // console.log(elements)

    //  const selectData = (ClickElements) => elements.id == ClickElements ;
    //  console.log(ClickElements.findIndex(selectData)) 
      // setNodeName(elements[ClickElements[0].id].data.label)
      // console.log(elements)
    }
   
    // 

  }


  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === selectNode) {
  
          el.data = {
            ...el.data,
            label: nodeName,
            
          };
        }
        return el;
      })
    );
  }, [nodeName, setElements]);

  const onSave = () => {
    fetch("/mapping/"+props.match.params.bot_id+"/save", {
      method : "POST",
      headers : {"Access-Control-Allow-Origin": "*",'Content-Type':'application/json'},
      body: JSON.stringify(initialElements)})
      

      
  }

  

  
  console.log(selectNode)

  const onAdd = () => {
    console.log(selectNode)
    const newNode = {
      id: getNodeId(),
      data: { label: ' New node' },
      position: {
        x: 250,
        y: 250,
      },
    };
    const params = {
      source: selectNode,
      // sourceHandle: null,
      target: newNode.id,
      label: 'From '+selectNode,
      // targetHandle: null
      }
    
   
    setElements((els) => els.concat(newNode))
    onConnect(params)
   
  };


  const onDelete = () => {
    console.log("Click"+selectNode)
    const newList = elements.filter((elements) => elements.id !== selectNode);
    const delTarget = newList.filter((elements) => elements.target !== selectNode);
    const delSource = delTarget.filter((elements) => elements.source !== selectNode); // เพิ่ม case ลบเส้น คือ if target == id or source = id
    console.log(delSource)
    setElements(delSource);
}

  // const onElementsRemove =  useCallback((ClickElements) => {
  //   const els = elements
  //   if(ClickElements != null){
  //     // console.log(ClickElements)
  //     setselectNode(ClickElements[0].id)
  //     const index = getIndex(ClickElements[0].id, elements, 'id');
  //   }
  //   else{
  //     console.log("User doesn't click any thing")
  //   }
  //   const newNode = {
  //     id: getNodeId(),
  //     data: { label: 'Added node' },
  //     position: {
  //       x: Math.random() * window.innerWidth - 10,
  //       y: Math.random() * window.innerHeight,
  //     },
  //   };
  //   setElements((els) => els.concat(newNode));
   
  // }, [setElements]);


  console.log(elements)
    return(
        <Styles>
        
        <div className="mapping-page">
            <Navbar_member botID = {props.match.params.bot_id} path={"mapping"} />
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Mapping</h2>
                    
                </div>

                <div className="updatenode__controls">
        <label>EDIT:</label>
        <input
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />
        {/* <select id = "NodeType" onchange = "#" >  
          <option disabled> ---Choose Node type--- </option>  
          <option> root node </option>  
          <option> leave node </option>  
          <option> middle node </option>  
          
        </select>   */}

        
          
         
        
        
        </div>
                <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        
        // onClick={(e) => setNodeName(e.target.nodeName)}
        // onElementClick = {onSelectionChange}
        onConnect={onConnect}
        onLoad={setRfInstance}
        onSelectionChange={onSelectionChange}     
        >

        <div className="save__controls">
          <button onClick={onSave}>save</button>
          {/* <button onClick={onRestore}>restore</button> */}
          <button onClick={onAdd}>add node</button>
          <button onClick={onDelete}>delete</button>
        </div>

        
      </ReactFlow>
    </ReactFlowProvider>

           
                
                
                    
            </div>

        </div>
        </Styles>        
        
    );
}

export default Mapping_create;