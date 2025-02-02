import User from '../models/User';

export const createUser = async(userid: string) => {
   
    return await User.create({userid});
}