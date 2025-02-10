export class CreateTodoRequestDto {
    userId: string;
    todo: string;
  
    constructor(userId: string, todo: string) {
      this.userId = userId;
      this.todo = todo;
    }
  }