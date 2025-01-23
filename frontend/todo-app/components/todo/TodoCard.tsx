import React from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import TodoItem from './TodoItem'
import { cn } from '@/lib/utils';

const toDos = [
  {text : 'Bulaşıkları Yıka', id : 1 , checked : false},
  {text: 'Projeyi tamamla', id : 2, checked : false},
  {text : 'Yatağını topla', id : 3, checked : true},
  {text : 'Deneme' , id : 4, checked : true}
];

const TodoCard = () => {
  return (

<div className="bg-white  shadow-lg  border-solid rounded-3xl p-16 w-10/12 md:w-9/12 xl:w-5/12 flex flex-col lg:mt-24 items-center content-center">
    <h1 className="text-3xl font-bold text-center
    text-gray-900 mb-6">Todo List</h1>
    <div className="mb-4 flex">
        <Input type="text" placeholder="Add a new todo"
            className= "!px-3 !py-2 !border !rounded-l-2xl !focus:outline-none !focus:ring-2 !focus:ring-blue-500 !text-gray-900 !text-sm !md:text-xl"></Input>

        <Button className="bg-blue-500 text-white
            px-4 py-2 rounded-r-2xl hover:bg-blue-600">Add</Button>
    </div>
    <TodoItem toDos = {toDos}></TodoItem>
  </div>
  )
}

export default TodoCard
