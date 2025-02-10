import { ITodo } from "../models/Todo";

export class TodoDto {
    todoId: string;
    userId: string;
    todo: string;
    selected: boolean;
    createdAt: string;
    updatedAt: string;

    constructor(todo: ITodo){
        this.todoId = todo._id.toString();
        this.userId = todo.userId;
        this.todo = todo.todo;
        this.selected = todo.selected;
        this.createdAt =  todo.createdAt ? new Date(todo.createdAt).toISOString().split("T")[0] : "";
        this.updatedAt = todo.updatedAt ? new Date(todo.updatedAt).toISOString().split("T")[0] : "";
    }
}