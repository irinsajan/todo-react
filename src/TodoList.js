import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, toggleTodo }) => {
  return (
    todos.map(todo => {
        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} /> //key helps React to re-render only the elements that change in an array; key is unique (here we use id)
    })
  )
}

export default TodoList