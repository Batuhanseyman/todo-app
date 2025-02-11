export class ResponseModel<T> {
    data: T;
    success: boolean;
    message?: string;
    time?: Date;
    constructor(success: boolean, content: T, message = "", time = new Date()){
       this.success = success;
       this.message = message;
       this.data = content;
       this.time = time;    
    }
}   