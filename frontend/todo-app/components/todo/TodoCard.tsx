import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import TodoItem from './TodoItem'
import { cn } from '@/lib/utils';

const toDos = [
  {text : 'Bulaşıkları Yıka', id : 1 , checked : false},
  {text: 'Projeyi tamamla', id : 2, checked : false},
  {text : 'Yatağını topla', id : 3, checked : true},
  {text : 'Deneme', id : 4, checked : false}
];



const TodoCard = () => {
  return (

<div className="bg-white  shadow-lg  border-solid rounded-3xl p-16  flex flex-col lg:mt-24 items-center content-center">
    <h1 className="text-3xl font-bold text-center
    text-gray-900 mb-6">Todo List</h1>
    <div className="mb-4 flex">
        <Input type="text" placeholder="Add a new todo"
            className= ""></Input>

        <Button className="bg-blue-500 text-white
            px-4 py-2 rounded-r-2xl hover:bg-blue-600">Add</Button>
    </div>
    <TodoItem toDos = {toDos}></TodoItem>
  </div>
  )
}

export default TodoCard
