import { Request, Response } from "express";
import { createUser } from "../services/userService";
import { ResponseModel } from "../models/ResponseModel";
import * as responseHelper from "../helpers/responseHelper"
import { CreateUserRequestDto } from "../dtos/CreateUserRequestDto";

export const addUser = async (req: Request, res: Response) => {
    try
    {
        const {userId} = req.body;
        const createUserRequest = new CreateUserRequestDto(userId);
        const newUser = await createUser(createUserRequest);
        const response = new ResponseModel(true, newUser, "User added successfully", new Date());
        
        responseHelper.httpCreated(res, response);
    } catch(error){
        const response = new ResponseModel(false, null, ("Failed to add user" + error), new Date());
        responseHelper.badRequest(res, response);
    }
};