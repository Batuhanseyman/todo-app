import User from '../models/User';
import { UserDto } from '../dtos/UserDto';
import { CreateUserRequestDto } from '../dtos/CreateUserRequestDto';

export const createUser = async(request: CreateUserRequestDto): Promise<UserDto> => {
   const newUser = new User({userid: request.userId})
    await newUser.save();
    return new UserDto(newUser);
}