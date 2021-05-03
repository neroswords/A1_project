import React, { useState, useEffect } from 'react';
import GroupForm from './GroupForm';
import Todo from './Todo';
import {Link} from "react-router-dom";

<<<<<<< HEAD
function GroupList({groupID, botID}) {


=======
function GroupList({groupID, botID, groupname}) {
>>>>>>> 02b71eaacbbd2046b9d297e03b2e137391b72277
  const [todos, setTodos] = useState([]);
  // const [file, setFile] = useState([]);
  
  useEffect(() => {
    fetch('/bot/'+botID+'/group/'+groupID +'/edit',)
      .then(res => res.json().then(data => {
        data.message.map((value,idx)=>{
          setTodos(old => [...old,{'id':idx,'text':value.data}])
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
    <>
      
      <div className='todo-app'>
        <GroupForm onSubmit={addTodo} />
        <Todo
          todos={todos}
          completeTodo={completeTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
          name={groupname}
        />
        
      </div>
      <div id="container-button">
          <Link className="link-group" to ={'/bot/'+botID+'/group/'}><button className="submit" type='submit' >success</button></Link>
      </div>
    </>
  );
}

export default GroupList;
