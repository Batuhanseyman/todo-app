export class DeleteTodoRequestDto{
    todoId: string;
    constructor(todoId: string)
    {
        this.todoId = todoId;
    }
}