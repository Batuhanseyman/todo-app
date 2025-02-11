import { Request, Response } from "express";
import {crateTodo, getTodos, updateTodo, deleteTodo, addTodos} from "../services/todoService";
import * as responseHelper from '../helpers/responseHelper';
import { ResponseModel } from "../models/ResponseModel";
import { todo } from "node:test";
import { CreateTodoRequestDto } from "../dtos/CreateTodoRequestDto";
import { UpdateTodoRequestDto } from "../dtos/UpdateTodoRequestDto";
import { GetTodoRequestDto } from "../dtos/GetTodoRequestDto";
import { DeleteTodoRequestDto } from "../dtos/DeleteTodoRequestDto";
import { InsertManyTodoRequestDto } from "../dtos/InsertManyTodoRequestDto";

export const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const userid = req.headers.userid as string; 
      const { todo } = req.body;
      const createTodoRequest = new CreateTodoRequestDto(userid, todo);

      const newTodo = await crateTodo(createTodoRequest);

      if(newTodo == null)
      {
        const response = new ResponseModel(false, null, "This todo already exists.", new Date());
         responseHelper.badRequest(res, response);
         return ;
      }

      const response = new ResponseModel(true, newTodo, "Todo added successfully", new Date());
      responseHelper.httpCreated(res, response);
      
    } catch (error) {
      const response = new ResponseModel(false, null, ("Failed to add todo" + error), new Date());
      responseHelper.badRequest(res, response);
    }
  };

  export const getUserTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const {id} = req.params;
      const getRequest = new GetTodoRequestDto(id);
      const todos = await getTodos(getRequest);
      const response = new ResponseModel(true, todos, "Todos fetching successfully", new Date());

      responseHelper.httpOk(res, response);

    } catch(error) {
      const response = new ResponseModel(false, null, ("Error: " + error), new Date());
      responseHelper.internalServerError(res, response);
    }

  };

  export const updateUserTodo = async (req: Request, res: Response): Promise<void> => {
    try{
      const {id} = req.params
      const {todo, selected} = req.body;

      if (!id || !todo) {
        const response = new ResponseModel(false, null, "Missing required fields.", new Date());
        responseHelper.badRequest(res, response);
         return;
      }

      const updateTodoRequest = new UpdateTodoRequestDto(id, todo, selected);
      const updatedTodo = await updateTodo(updateTodoRequest);


      if (!updatedTodo) {
        responseHelper.notFound(res);
        return;
      }
      const response = new ResponseModel(true, updatedTodo, "Todo updated successfully", new Date());
      responseHelper.httpOk(res, response);

    }catch(error){
      const response = new ResponseModel(false, null, ("Failed to update todo"+ error), new Date());
      responseHelper.internalServerError(res, response);
    }
  };


  export const deleteUserTodo = async (req: Request, res: Response): Promise<void> => {
    try {    
      const {id} = req.params;
      const deleteRequest = new DeleteTodoRequestDto(id);

        const deletedTodo = await deleteTodo(deleteRequest);

        if(deletedTodo == null)
        {
          responseHelper.notFound(res);
          return;
        }
        const response = new ResponseModel(true, deletedTodo, "Todo deleted successfully", new Date());
        responseHelper.httpOk(res, response);
      }catch(error){
        const response = new ResponseModel(false, null, ("Failed to delete todo " + error), new Date());
        responseHelper.internalServerError(res, response);
      }
  }

export const addLocalTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const {data} = req.body;
    if (!Array.isArray(data) || data.length === 0) {
      const response = new ResponseModel(false, null, "Required todos", new Date());
      responseHelper.badRequest(res, response);
      return;
    }

  const todoDtos = data.map(todo => new InsertManyTodoRequestDto(todo));

  const insertedTodos = await addTodos(todoDtos);
  
  const response = new ResponseModel(true, null, "Todos addded successfully", new Date());
  responseHelper.httpCreated(res, response);  

  } catch (error) {
    const response = new ResponseModel(false, null, "Error adding todos!", new Date());
    responseHelper.internalServerError(res, response);

  }
};