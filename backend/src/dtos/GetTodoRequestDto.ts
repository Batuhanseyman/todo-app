export class GetTodoRequestDto{
    userId: string;
    constructor(userId: string){
        this.userId  = userId;
    }
}