import { Checkbox } from '@/components/ui/checkbox';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { deleteTodo, updateTodo } from '@/services/todoService';
import { Input } from '../ui/input';

export interface Todo {
    _id: string;
    todo: string;
    selected?: boolean;
  }


  interface TodoItemProps {
    toDos: Todo[];
    onDelete: (todoId: string) => void;
    onUpdate: (updatedTodo: Todo) => void
  }


const TodoItem: React.FC<TodoItemProps> = ({toDos, onDelete, onUpdate}) => {
 
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const handleDeleteClick = async (todoId: string) => {
    try{
      await deleteTodo(todoId);
      onDelete(todoId);
    }catch(error){
      console.error("Error during delete todo ", error);
    }

  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleSaveClick = async () => {
    if (editingTodo) {
      try {
        const updatedTodo = await updateTodo(editingTodo._id, editingTodo.todo, Boolean(editingTodo.selected)); 
        onUpdate(updatedTodo); 
        setEditingTodo(null); 
      } catch (error) {
        console.error("Error during update todo", error);
      }
    }
  };

  const handleCheckboxChange = async (todoId: string, todo: string, selected: boolean |string) => {
    const updatedTodo: Todo = {_id: todoId, todo: todo, selected: Boolean(selected)}
    await updateTodo(todoId, todo, Boolean(selected));
    onUpdate(updatedTodo);
  };

  const handleTextChange = (todoId: string, text: string) => {
    if (editingTodo && editingTodo._id === todoId) {
      setEditingTodo({ ...editingTodo, todo: text }); 
    }
  };
 
  const toDoItems = toDos.map((toDo)=>(


    <li className="text-black flex items-center p-3 rounded-xl bg-slate-100 border border-gray-200 hover:bg-slate-300"
        key={toDo._id}
    >
      {editingTodo && editingTodo._id === toDo._id ? (
      <>
        <Input
            type="text"
            onChange={(e) => handleTextChange(toDo._id, e.target.value)}
            value={editingTodo.todo}
            className="mr-2 p-1 border rounded"/>
          <Button className='bg-red-500 hover:bg-red-600 text-white' onClick={() => setEditingTodo(null)}>X</Button>
          <Button onClick={handleSaveClick}  className="ml-2 border-none p-2 rounded-lg bg-green-500 text-white hover:bg-green-600">
            Save
          </Button>
      </>
      ) : (
        <> 
        <Checkbox checked = {toDo.selected} onCheckedChange={(checked) => handleCheckboxChange(toDo._id, toDo.todo, checked)}
        className= 'mr-2 h-5 w-5 text-blue-600'>

        </Checkbox>
        <span className={"flex-grow text-gray-800 "}>{toDo.todo}</span>
        <Button className="ml-2 border-none p-2 rounded-lg bg-gray-500 text-white  hover:bg-gray-600"
        onClick={() => handleEditClick(toDo)}>Edit</Button>
        <Button onClick={() => handleDeleteClick(toDo._id)} className="ml-2 border-none p-2 rounded-lg bg-red-500 text-white  hover:bg-red-700">
            Delete 
        </Button>
        </>)
        }
    </li>
  ));
  
    return (
        <ul className="space-y-2">{toDoItems}</ul>
  )
}

export default TodoItem
