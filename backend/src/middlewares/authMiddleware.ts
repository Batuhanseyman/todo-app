import { Request, Response, NextFunction } from "express";
import admin from "../configs/firebase/firebaseAdmin";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const uid = req.headers.userid as string;
        if(!uid){
            res.status(401).json({message: "Unauthorized: No UID provided"});
            return;
        }

        const user = await admin.auth().getUser(uid);
        if(!user){
            res.status(401).json({ message: "Unauthorized: Invalid UID" });
            return;
        }

        next();

    }catch(error){
        res.status(401).json({ message: "Unauthorized", error });

    }
};

export default authMiddleware;