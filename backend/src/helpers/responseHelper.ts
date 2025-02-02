import { Response } from "express";
import { ResponseModel } from "../models/ResponseModel";
export const badRequest =  <ResponseBody>(res: Response, data: ResponseModel<ResponseBody>) =>res.status(400).json(data);
export const httpOk  =  <ResponseBody>(res: Response, data: ResponseModel<ResponseBody>) =>res.status(200).json(data);
export const httpCreated = <ResponseBody>(res: Response, data: ResponseModel<ResponseBody>) =>res.status(201).json(data);
export const notFound  =  (res: Response) =>res.status(404).json();
export const unauthorized  =  <ResponseBody>(res: Response, data: ResponseModel<ResponseBody>) =>res.status(401).json(data);
export const internelServerError = <ResponseBody>(res: Response, data: ResponseModel<ResponseBody>) =>res.status(500).json(data);