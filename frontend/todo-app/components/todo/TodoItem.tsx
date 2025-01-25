import { Checkbox } from '@/components/ui/checkbox';
import React from 'react'
import { Button } from '../ui/button';

interface Todo {
    id: number;
    text: string;
    checked?: boolean;
  }


  interface TodoItemProps {
    toDos: Todo[];
  }

const TodoItem: React.FC<TodoItemProps> = ({toDos}) => {
  
  const toDoItems = toDos.map((toDo)=>(

    <li className="text-black flex items-center p-3 rounded-xl bg-slate-100 border border-gray-200 hover:bg-slate-300"
        key={toDo.id}
    >
        <Checkbox className= 'mr-2 h-5 w-5 text-blue-600'>

        </Checkbox>
        <span className={"flex-grow text-gray-800 "}>{toDo.text}</span>
        <Button className="ml-2 border-none p-2 rounded-lg bg-red-500 text-white  hover:bg-red-700">
            Delete 
        </Button>
    </li>
  ));
  
    return (
        <ul className="space-y-2">{toDoItems}</ul>
  )
}

export default TodoItem
