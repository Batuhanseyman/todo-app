import { ITodo } from "../models/Todo";

export class InsertManyTodoRequestDto {
    userId: string;
    todo: string;
    selected: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(todo: ITodo){
        this.userId = todo.userId;
        this.todo = todo.todo;
        this.selected = todo.selected;
        this.createdAt = todo.createdAt;
        this.updatedAt = todo.updatedAt;
    }
}