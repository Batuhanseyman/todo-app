import React from 'react'
import { Input } from './ui/input';




const TodoCard = ({todos}) => {

    const todoItems = todos.map(todo =>
        <>
        <li className='text-black flex items-center p-3
        rounded-xl bg-slate-100 border boder-gray-200
        hover:bg-slate-300'
        key =  {todo.id}
        >
            <input type='checkbox'
            name='check'
            className='mr-2 h-5 w-5 text-blue-600'
            />
            <span
                className= "flex-grow text-gray-800"
            >{todo.text}</span>
            <button className='ml-2 border-none p-2 rounded-lg
            bg-red-500 text-white hover:bg-red-700'
            >Delete</button>
        </li>
        <Input>
        </Input>
    </>
    );
  return (
    <ul className='space-y-2'>
        {todoItems}
    </ul>
  )
}

export default TodoCard
