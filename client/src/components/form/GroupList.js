import React, { useState, useEffect } from 'react';
import GroupForm from './GroupForm';
import Todo from './Todo';

function GroupList({groupID, botID, groupname}) {
  const [todos, setTodos] = useState([]);
  // const [file, setFile] = useState([]);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
    console.log(todo)

    fetch('/train_bot/'+botID+'/group'+groupID, {
      method : 'POST',
      headers : {
          "Access-Control-Allow-Origin": "*",
          'Content-Type':'application/json'
          },
      body: JSON.stringify(todo)}).then(res=>res.json().then(data => {
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

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        console.log(todo)
        console.log(todos)
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    fetch('/train_bot/' + botID + '/group/'+groupID)
      .then(res => res.json().then(data => {
        console.log(data)

        

      }))

  }, []);

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
    </>
  );
}

export default GroupList;
