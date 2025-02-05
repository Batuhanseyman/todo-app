"use client"
import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import TodoItem, { Todo } from './TodoItem'
import { useState, useEffect } from 'react'
import { addTodo, getTodos } from '@/services/todoService'
import { getSessionCookie } from '@/lib/cookies'


const TodoCard = () => {

  const [todos, setTodos] =  useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect (() => {
    if(getSessionCookie() == null) return;

    const fetchTodos = async () => {
      const fetchedTodos = await getTodos();
      console.log(fetchedTodos.data);
      setTodos(fetchedTodos.data);
    }
    fetchTodos();
  });

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;

    const response = await addTodo(newTodo);
    if(response.success){
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodo("");
    }
  }

  const handleDelete = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId));
  }


  const handleUpdate = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
    );
  }

  return (

<div className="bg-white  shadow-lg  border-solid rounded-3xl w-full md:w-1/3 p-16  flex flex-col  lg:mt-24 items-center content-center">
    <h1 className="text-3xl font-bold text-center
    text-gray-900 mb-6">Todo List</h1>
    <div className="mb-4 flex">
        <Input type="text" placeholder="Add a new todo"
            className= "mr-2 rounded-l-xl" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}></Input>

        <Button onClick={handleAddTodo} className="bg-blue-500 text-white
            px-4 py-2 rounded-r-2xl hover:bg-blue-600">Add</Button>
    </div>
    <TodoItem toDos = {todos} onDelete = {handleDelete} onUpdate={handleUpdate}></TodoItem>
  </div>
  )
}

export default TodoCard
