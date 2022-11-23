import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

//use 'uuid' library to create random ids\

//key for local storage
const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  //default state is an empty array
  //useState always returns an array and on next line it's destructured to get first 2 elements
  const [todos, setTodos] = useState([]);
  //useRef is used to refer to elements inside html
  const todoNameRef = useRef();
  //we have to load the todos when the component loads - done only once - so [] as arg 2 in useEffect as it will never change
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos);
  }, [])
  //useEffect is used to make something happen when something changes
  //here we need to save todo list to localStorage when there's a change
  //2 args - arg 1 is a function to be run when there's change in arg 2 which is an array
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos])

  function toggleTodo(id) {
    //never modify a state directly; always create a copy, change it and set the state
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === '') return 
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed Todos</button>
      <div>{todos.filter(todo => !todo.complete).length}</div>
    </>
  )
}

export default App;
