import { IUser } from "../models/User";

export class UserDto {
    userId: string;
    constructor(user: IUser){
        this.userId = user.userid;
    }
}