import { TodoDto } from "../dtos/TodoDto";
import  Todo, { ITodo }  from "../models/Todo";
import { CreateTodoRequestDto } from "../dtos/CreateTodoRequestDto";
import { UpdateTodoRequestDto } from "../dtos/UpdateTodoRequestDto";
import { error } from "console";
import { GetTodoRequestDto } from "../dtos/GetTodoRequestDto";
import { DeleteTodoRequestDto } from "../dtos/DeleteTodoRequestDto";
import { InsertManyTodoRequestDto } from "../dtos/InsertManyTodoRequestDto";

export const crateTodo = async (request: CreateTodoRequestDto): Promise<TodoDto | null> => {
    const existingTodo = await Todo.findOne({ userId: request.userId, todo: request.todo});

    if(existingTodo)
    {
        return null;
    }

    const newTodo = new Todo({userId: request.userId, todo: request.todo});
    await newTodo.save();
    return new TodoDto(newTodo);
}


export const getTodos = async (request: GetTodoRequestDto): Promise<TodoDto[]> => {
    const todos: ITodo[] = await Todo.find({userId: request.userId});
    return todos.map(todo => new TodoDto(todo));
}


export const updateTodo = async (request: UpdateTodoRequestDto): Promise<TodoDto | null> => {
    
    const updatedTodo = await Todo.findByIdAndUpdate(
        request.todoId,
        {todo: request.todo, selected: request.selected },
        { new: true }
      );
  
      return updatedTodo ? new TodoDto(updatedTodo) : null;
}

export const deleteTodo = async (request: DeleteTodoRequestDto): Promise<Boolean> => {
   
    const result = await Todo.findByIdAndDelete(request.todoId);
    return !!result;
}

export const addTodos = async (request: InsertManyTodoRequestDto[]): Promise<void> => {
    const todos = request.map((todo) => ({
        userId: todo.userId,
        todo: todo.todo,
        selected: todo.selected,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt
    }));

    await Todo.insertMany(todos);

}
