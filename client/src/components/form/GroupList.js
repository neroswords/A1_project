import React, { useState, useEffect } from 'react';
import GroupForm from './GroupForm';
import Todo from './Todo';
import {Link} from "react-router-dom";
import styled from 'styled-components';

const Styles = styled.div` 
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
`

function GroupList({groupID, botID, groupname}) {
  const [todos, setTodos] = useState([]);
  const [reload, setReload] = useState(false);
  // const [file, setFile] = useState([]);
  
  useEffect(() => {
    fetch('/bot/'+botID+'/group/'+groupID +'/edit',)
      .then(res => res.json().then(data => {
        data.message.map((value,idx)=>{
          setTodos(old => [...old,{'id':idx,'text':value.data}])
          setReload(true)
        })
        

      }))
      

  }, []);
  console.log(todos)

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    console.log('1')
    setTodos(newTodos);
    // console.log(todo['file'])
    // console.log(todo.file)
    let list=todo
    const data = new FormData()
    data.append('file',list.file)
    data.append('text',list.text)
    console.log(list)
    // console.log(data)
    console.log(...todos);
    // console.log(todo)
    // console.log('/bot/'+botID+'/group/'+groupID +'/edit',)
    console.log(todo)
    fetch('/bot/'+botID+'/group/'+groupID +'/edit', {
      method : 'POST',
      headers : {
          "Access-Control-Allow-Origin": "*",
          // 'Content-Type':'application/json'
          },
      body: data}).then(res=>res.json().then(data => {
        if ("error" in data)
        {
          // setFlash(data['error'])
        }
      }))
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    console.log('2')
    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter(todo => todo.id !== id);
    console.log('3')
    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        console.log(todo)
        console.log(todos)
      }
      return todo;
    });
    console.log(todos)
    console.log('4')
    setTodos(updatedTodos);
  };

  

  return (
 
      <Styles>
           <>
        {reload ?         <div className='todo-app'>
        <GroupForm onSubmit={addTodo} />
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          name={groupname}
        />
        
      </div> 

      : <div class="loader"></div>}
        <div id="container-button">
        <Link className="link-group" to ={'/bot/'+botID+'/group/'}><button className="submit" type='submit' >success</button></Link>
    </div>
    </>
      </Styles>
  
  );
}

export default GroupList;
