import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault(); 
    if (!input.trim()) return;

    try {
      const newTodo = { title: input, completed: false };
      const response = await createTodo(newTodo);
      setTodos([...todos, response.data]);
      setInput('');
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleToggleComplete = async (id) => {
    const todoToUpdate = todos.find(todo => todo._id === id);
    try {
      const updatedTodoData = { ...todoToUpdate, completed: !todoToUpdate.completed };
      const response = await updateTodo(id, updatedTodoData);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error)
    {
      console.error("Error updating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>My To-Do List</h1>
      <form onSubmit={handleAddTodo} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <li key={todo._id} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => handleToggleComplete(todo._id)}>
                {todo.title}
              </span>
              <button onClick={() => handleDeleteTodo(todo._id)} className="delete-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;