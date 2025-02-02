import { Request, Response } from "express";
import {crateTodo, getTodos, updateTodo, deleteTodo} from "../services/todoService";
import * as responseHelper from '../helpers/responseHelper';
import { ResponseModel } from "../models/ResponseModel";
import { todo } from "node:test";

export const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { todo, userId, selected } = req.body;

      const newTodo = await crateTodo(userId, todo, selected);
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
      const todos = await getTodos(req.body.userId);
      const response = new ResponseModel(true, todos, "Todos fetching successfully", new Date());

      responseHelper.httpOk(res, response);

    } catch(error) {
      const response = new ResponseModel(false, null, ("Error: " + error), new Date());
      responseHelper.internelServerError(res, response);
    }

  };

  export const updateUserTodo = async (req: Request, res: Response): Promise<void> => {
    try{
      const {id} = req.params
      const {todo, selected} = req.body;

      const updatedTodo = await updateTodo(id, todo, selected);

      if (!id || !todo) {
        const response = new ResponseModel(false, null, "Missing required fields.", new Date());
        responseHelper.badRequest(res, response);
         return;
      }

      if (!updatedTodo) {
        responseHelper.notFound(res);
        return;
      }
      const response = new ResponseModel(true, updatedTodo, "Todo updated successfully", new Date());
      responseHelper.httpOk(res, response);

    }catch(error){
      const response = new ResponseModel(false, null, ("Failed to update todo"+ error), new Date());
      responseHelper.internelServerError(res, response);
    }
  };


  export const deleteUserTodo = async (req: Request, res: Response): Promise<void> => {
    try {    
      const {id} = req.params;

        const deletedTodo = await deleteTodo(id);

        if(deletedTodo == null)
        {
          responseHelper.notFound(res);
          return;
        }
        const response = new ResponseModel(true, deletedTodo, "Todo deleted successfully", new Date());
        responseHelper.httpOk(res, response);
      }catch(error){
        const response = new ResponseModel(false, null, ("Failed to delete todo " + error), new Date());
        responseHelper.internelServerError(res, response);
      }
  }