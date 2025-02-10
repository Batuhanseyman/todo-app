import { Request, Response, NextFunction } from "express";
import admin from "../configs/firebase/firebaseAdmin";
import { unauthorized } from "../helpers/responseHelper";
import { ResponseModel } from "../models/ResponseModel";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const uid = req.headers.userid as string;
        if(!uid){
            const response = new ResponseModel(false, null, "Unauthorized: No UID provided", new Date());
            unauthorized(res, response);
            return;
        }

        const user = await admin.auth().getUser(uid);
        if(!user){
            const response = new ResponseModel(false, null, "Unauthorized: Invalid UID", new Date());
            unauthorized(res, response);
            return;
        }

        next();

    }catch(error){
        const response = new ResponseModel(false, null, "Unauthorized", new Date());
        unauthorized(res, response);
    }
};

export default authMiddleware;