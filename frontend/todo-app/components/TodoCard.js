import React from 'react'

const toDos = [
    {text : 'Bulaşıkları Yıka', id : 1 },
    {text: 'Projeyi tamamla', id : 2},
    {text : 'Yatağını topla', id : 3}
];


const TodoCard = () => {

    const toDoItems = toDos.map(toDo =>
        <li className='text-black flex items-center p-3
        rounded-xl bg-slate-100 border boder-gray-200
        hover:bg-slate-300'
        key =  {toDo.id}
        >
            <input type='checkbox'
            name='check'
            className='mr-2 h-5 w-5 text-blue-600'
            />
            <span
                className= "flex-grow text-gray-800"
            >{toDo.text}</span>
            <button className='ml-2 border-none p-2 rounded-lg
            bg-red-500 text-white hover:bg-red-700'
            >Delete</button>
        </li>
    );
  return (
    <ul className='space-y-2'>
        {toDoItems}
    </ul>
  )
}

export default TodoCard
