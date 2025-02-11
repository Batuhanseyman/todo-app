import { Request, Response, NextFunction } from "express";
import RequestCounter,{ IRequestCounter } from '../models/RequestCounter'
import { badRequest, internalServerError } from "../helpers/responseHelper";
import { ResponseModel } from "../models/ResponseModel";

export const requestCounterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.headers.userid as string;
        if (!userId) {
            const response = new ResponseModel(false, null, "User ID is required", new Date());
            badRequest(res, response);
            return; 
          }
      
          const method = req.method.toUpperCase();
            

          await RequestCounter.findOneAndUpdate(
            { userId }, 
            { $inc: { [`counts.${method}`]: 1 } }, 
            { upsert: true, new: true }
          );
      
          next();

    }catch(error){
        const response = new ResponseModel(false, null, "Internal server error", new Date());
        internalServerError(res, response);
    }
}