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
  position: relative;
  margin-top: 1%;
  width: 100%;
  text-align: right;
}
.save__controls button{
  
  margin-left: 0.2%;
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 25px;
  transition: 0.5s;
  
  color: #fff;
}
.save__controls .addButton{
  
  border: 1px solid #0078ff;
  background-color: #0078ff;
 
}
.save__controls .deleteButton{
  
  border: 1px solid #CD5C5C;
  background-color: #CD5C5C;
 
}
.save__controls .saveButton{
  
  border: 1px solid rgb(29, 151, 29);
  background-color: rgb(29, 151, 29);
 
}
.updatenode__controls {
  z-index: 10;
  /* position: absolute; */
  margin-top: 1%;
  width: 100%;
  text-align: right;
}
.updateNode {
  width: 130px;
  height: 30px;
  border-radius: 25px;
  border: .5px solid #A9A9A9;
  margin-left: 1%;
  
}
input::placeholder{
  padding-left:30px;

}
` 
// make delete button and drop down change node type


function Mapping({mapID,botID,load_elements,load_details,load_name}){
 console.log(load_elements)
  const flowKey = 'example-flow';
  const getNodeId = () => `node_${+new Date()}`;

  const style = {
    background: 'white',
    width: '100%',
    height: 300,
  };
  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [details, setDetails] = useState(load_details);
  const [name,setName] = useState(load_name);
  const [nodeName, setNodeName] = useState('Root');
  const [Keyword, setKeyword] = useState();
  const [Parameter, setParameter] = useState();
  const [selectNode, setselectNode] = useState("1");
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  

  const getIndex = (value, arr, prop) => {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; 
}

  const onSelectionChange = (ClickElements) => {
    
    if(ClickElements != null){
      
      setselectNode(ClickElements[0].id)
      const index = getIndex(ClickElements[0].id, elements, 'id');
     
      setNodeName(elements[index].data.label)
      setKeyword(details[index].keyword)
      setParameter(details[index].parameter)
     

    }
   
  }
  
  useEffect(() => {
    setElements(load_elements)
    console.log(elements)
    setElements((els) =>
      els.map((el) => {
        //   console.log(el)
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
    
    const data = {
      name: "",
      node: elements,
      details: details
    }
    // console.log(data)
    fetch('/mapping/'+botID+'/detail/'+mapID+'/update', {
      method : "POST",
      headers : {"Access-Control-Allow-Origin": "*",'Content-Type':'application/json'},
      body: JSON.stringify(data)})
      window.location.replace("/bot/"+botID+"/mapping")    

      
  }

  const changeAnswer = (evt) =>{
    setNodeName(evt)

    setDetails((els) =>
    els.map((el) => {
      if (el.id === selectNode) {

        el.answer = evt;
      }
      return el;
    })
  );
  }

  const changeKeyword = (evt) =>{
      setKeyword(evt)

      setDetails((els) =>
      els.map((el) => {
        if (el.id === selectNode) {
  
          el.keyword = evt;
        //   console.log(el)
        }
        return el;
      })
    );
  }
  
  const changeParams = (evt) =>{
    setParameter(evt)

    setDetails((els) =>
    els.map((el) => {
      if (el.id === selectNode) {

        el.parameter = evt;
      }
      return el;
    })
  );
  }

  const changeName = (evt) =>{
    setName(evt)

    
  }


  const onAdd = () => {
    // console.log(selectNode)
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
      // label: 'From '+selectNode,
      // targetHandle: null
      }
      const newDetails = {
        id : newNode.id,
        answer : newNode.data.label,
        keyword : '',
        parameter : '',
        }
    
   
    setElements((els) => els.concat(newNode))
    setDetails((els) => els.concat(newDetails))
    onConnect(params)
   
  };


  const onDelete = () => {
    // console.log("Click"+selectNode)
    const newList = elements.filter((elements) => elements.id !== selectNode);
    const delTarget = newList.filter((elements) => elements.target !== selectNode);
    const delSource = delTarget.filter((elements) => elements.source !== selectNode); // เพิ่ม case ลบเส้น คือ if target == id or source = id
    // console.log(delSource)
    setElements(delSource);
}
//   console.log(name)
      return(
        <Styles>
        
        <div className="mapping-page">
            <Navbar_member botID = {botID} path={"mapping"} />
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight'>Mapping</h2>
                    
                </div>

                <div className="updatenode__controls">
        <div className="details__node">
        <label >Name:</label>
        <input className="updateNode"
          value={name}
          onChange={(evt) => changeName(evt.target.value)}
        />
        <label >Answer:</label>
        <input className="updateNode"
          value={nodeName}
          onChange={(evt) => changeAnswer(evt.target.value)}
        />

        <label >Keyword :</label>
        <input className="updateNode"
          value={Keyword}
          onChange={(evt) => changeKeyword(evt.target.value)}
        />

      <label >Parameter :</label>
        <input className="updateNode"
          value={Parameter}
          onChange={(evt) => changeParams(evt.target.value)}
        />
        </div>
        
        
        </div>
                <ReactFlowProvider>
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}

        onConnect={onConnect}
        onLoad={setRfInstance}
        onSelectionChange={onSelectionChange}     
        >

        <div className="save__controls">
          <button className="saveButton" onClick={onSave}>save</button>
          {/* <button onClick={onRestore}>restore</button> */}
          <button className="addButton" onClick={onAdd}>add node</button>
          <button className="deleteButton" onClick={onDelete}>delete</button>
        </div>

        
      </ReactFlow>
    </ReactFlowProvider>

           
                
                
                    
            </div>

        </div>
        </Styles>        
        
    );
}

export default Mapping;