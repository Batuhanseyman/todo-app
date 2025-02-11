import express from 'express';
import  authMiddleware  from '../middlewares/authMiddleware';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post("/", authMiddleware, userController.addUser);

export default router;