import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, setNewTodo, setEditingTodo, setEditText } from './slices/todoSlice';
import _ from 'lodash';
import { FaCheck, FaTimes, FaPencilAlt, FaTrash } from 'react-icons/fa';
import './TodoApp.css';
import './App.css';

const TodoApp = () => {
  const dispatch = useDispatch();
  const { todos, newTodo, editingTodo, editText } = useSelector((state: any) => state.todo);
  const [searchTerm, setSearchTerm] = useState('');

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    if (storedTodos.length > 0) {
      dispatch(setTodos(storedTodos));
    }
  }, [dispatch]);

  // Save todos to local storage whenever todos are updated
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const generateUniqueId =
    Math.random().toString(20).substring(2) + (Date.now() / 1000 | 0).toString(20);

  const addTodo = () => {
    if (newTodo !== '') {
      const newId = generateUniqueId;
      const newTodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      dispatch(setTodos([...todos, newTodoItem]));
      dispatch(setNewTodo(''));
    }
  };

  const removeTodo = (id: number) => {
    const updatedTodos = _.filter(todos, (todo: any) => todo.id !== id);
    dispatch(setTodos(updatedTodos));
  };

  const startEditing = (id: any, text: string) => {
    dispatch(setEditingTodo(id));
    dispatch(setEditText(text));
  };

  const finishEditing = (id: number) => {
    const updatedTodos = _.map(todos, (todo: any) => (todo.id === id ? { ...todo, text: editText } : todo));

    dispatch(setTodos(updatedTodos));
    dispatch(setEditingTodo(null));
    dispatch(setEditText(''));
  };

  const onHandleCheckBox = (id: number) => {
    const updatedTodos = _.map(todos, (todo) => ({ ...todo, completed: todo.id === id ? !todo.completed : todo.completed }));

    dispatch(setTodos(updatedTodos));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const HandleOnClick = (id: number, text: string) => {
    if (editingTodo !== id) {
      startEditing(id, text);
    }
  };

  const filteredTodos = todos.filter((todo: { text: string; }) =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='todo'>
      <div className="top-bar">
        <h1 className='text-2xl '>My Todo App</h1>
        <input
          className='search-bar'
          type='text'
          value={searchTerm}
          placeholder='Search Todos...'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='card'>
        <input
          className='box'
          type='text'
          value={newTodo}
          placeholder='Add Todo..'
          onChange={(e) => dispatch(setNewTodo(e.target.value))}
          onKeyPress={handleKeyPress}
        />
        <button className='button button-add' onClick={addTodo}>
          <FaCheck /> Add
        </button>
        <ul>
          <h3>Todo List</h3>
          {filteredTodos.map((todo: any) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onHandleCheckBox(todo.id)}
              />
              {editingTodo === todo.id ? (
                <>
                  <input
                    className='box'
                    type='text'
                    value={editText}
                    onChange={(e) => dispatch(setEditText(e.target.value))}
                    style={{ textDecoration: 'none' }}
                  />
                  <button className='button button-save' onClick={() => finishEditing(todo.id)}>
                    <FaCheck /> Save
                  </button>
                  <button className='button button-cancel' onClick={() => dispatch(setEditingTodo(null))}>
                    <FaTimes /> Cancel
                  </button>
                </>
              ) : (
                <>
                  <p onClick={() => HandleOnClick(todo.id, todo.text)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.text}
                  </p>
                  <button className='button' onClick={() => removeTodo(todo.id)}>
                    <FaTrash /> Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
