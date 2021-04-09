import React, { useEffect, useState,Fragment, useCallback } from 'react';
// import Table from '../Components/Table/Tablemap';
import Navbar_member from '../Components/Navbar/navbar_member';
import { useHistory } from "react-router-dom";
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
.react-flow{
  max-height: 50vh;
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
  position: relative;
  margin-top: 1%;
  width: 100%;
  text-align: right;
  max-width: 25%;
  float: right;
}
.updateNode {
  width: 130px;
  height: 30px;
  border-radius: 25px;
  border: .5px solid #A9A9A9;
  margin-left: 1%;
  margin-top: 1%;
  
}
input::placeholder{
  padding-left:30px;

}
` 
// make delete button and drop down change node type


function Mapping_load(props){
  const history = useHistory();

  // console.log(props.match.params.map_id)
  const mapID = props.match.params.map_id
  const botID = props.match.params.bot_id
  const flowKey = 'example-flow';
  const getNodeId = () => `node_${+new Date()}`;



  const LoadElements = [
  // { id: '1', type:'input', data: { label: '' }, position: { x: 400, y: 100 } },
  // // { id: '2', data: { label: 'Node 2' }, position: { x: 200, y: 200 } },
  // // { id: 'e1-2', source: '1', target: '2' },
  ];
  const LoadData = [
    // { id: '1', answer: 'Root', keyword: 'shirt' ,parameter : 'red'}
  
  ];
  const style = {
    background: 'white',
    width: '100%',
    height: 300,
  };
  const [rfInstance, setRfInstance] = useState(null);
  const [elements, setElements] = useState(LoadElements);
  const [details, setDetails] = useState(LoadData);
  const [name,setName] = useState();
  const [nodeName, setNodeName] = useState();
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
      
      const index_el = getIndex(ClickElements[0].id, elements, 'id');
      const index_details = getIndex(ClickElements[0].id, details, 'id');
    
      setNodeName(elements[index_el].data.label)
      setKeyword(details[index_details].keyword)
      setParameter(details[index_details].parameter)
     

    }
   


  }


  useEffect(() => {
    fetch('/mapping/detail/'+mapID).then(res => res.json().then(data => {
      // console.log(data[0])
      setElements(data[0].node)
    setDetails(data[0].details)
    setName(data[0].name)
  }
    ))

    
  }, []);

  console.log(elements)

  const onSave = () => {
    
    const data = {
      name: name,
      node: elements,
      details: details
    }
    // console.log(data)
    fetch('/mapping/'+botID+'/detail/'+mapID+'/update', {
      method : "POST",
      headers : {"Access-Control-Allow-Origin": "*",'Content-Type':'application/json'},
      body: JSON.stringify(data)})
      history.push("/bot/"+botID+"/mapping");
      // window.location.replace("/bot/"+botID+"/mapping")    

      
  }

const changeAnswer =  (evt) =>{
    
    setNodeName(evt)
    setElements((els) =>
       els.map((el) => {
        if (el.id === selectNode) {
  
          el.data = {
            ...el.data,
            label: evt,
            
          };
        }
        return el;
      })
    )

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
          // console.log(el)
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

  const test = (evt) =>{
    
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
        keyword : "keyword",
        parameter : "parameter",
        }
    // console.log(newNode)
    // console.log(newDetails)
   
    setElements((els) => els.concat(newNode))
    setDetails((els) => els.concat(newDetails))
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
  // console.log(name)
      return(
        <Styles>
        
        <div className="mapping-page">
            <Navbar_member botID = {props.match.params.bot_id} path={"mapping"} />
            <div className="container">
                <div className="container-top d-flex bd-highlight">
                    <h2 className='p-2 flex-grow-1 bd-highlight' id="mapping-load-header">Mapping</h2>
                    
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

        <div className="updatenode__controls">
        <div className="name__node">
        <label >Name:</label>
        <input className="updateNode"
          value={name}
          onChange={(evt) => changeName(evt.target.value)}
        />
         </div>
         <div className="answer__node">
        <label >Answer:</label>
        <input className="updateNode"
          value={nodeName}
          onChange={(evt) => changeAnswer(evt.target.value)}
        /></div>

        <div className="Keyword__node">
        <label >Keyword :</label>
        <input className="updateNode"
          value={Keyword}
          onChange={(evt) => changeKeyword(evt.target.value)}
        />
        </div>

        <div className="params__node">
      <label >Parameter :</label>
        <input className="updateNode"
          value={Parameter}
          onChange={(evt) => changeParams(evt.target.value)}
        />
        </div>
      
       
        
        
        </div> 
        
      </ReactFlow>
      
    </ReactFlowProvider>

    

           
                
                
                    
            </div>

        </div>
        </Styles>        
        
    );
}

export default Mapping_load;