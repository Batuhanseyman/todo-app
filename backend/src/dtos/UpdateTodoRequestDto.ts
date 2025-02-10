export class UpdateTodoRequestDto {
    todoId: string;
    todo: string;
    selected: boolean;
  
    constructor(todoId: string, todo: string, selected: boolean) {
      this.todoId = todoId;
      this.todo = todo;
      this.selected = selected;
    }
  }