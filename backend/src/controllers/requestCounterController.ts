import { Request, Response } from "express";
import * as responseHelper from '../helpers/responseHelper';
import { ResponseModel } from "../models/ResponseModel";
import { GetRequestCounterDto } from "../dtos/GetRequestCounterDto";
import { getRequestCounter } from "../services/requestCounterService";

export const getRequestCounts = async (req: Request, res: Response): Promise<void> => {
    try{
        const {id} = req.params
        if(!id)
        {
            const response = new ResponseModel(false, null, "Require user-id", new Date());
            responseHelper.badRequest(res, response);
            return;
        }

        const getRequest = new GetRequestCounterDto(id);
        const requestCounts = await getRequestCounter(getRequest);
        const response = new ResponseModel(true, requestCounts, "Request Counts fetched successfully", new Date());
        responseHelper.httpOk(res, response);
        
    }catch(error){
        const response = new ResponseModel(false, null, "Error fetching request counts!", new Date());
        responseHelper.internalServerError(res, response);
    }
}