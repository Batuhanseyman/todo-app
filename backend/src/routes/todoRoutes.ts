import express from 'express';
import * as TodoController from "../controllers/todoController";
import  authMiddleware  from '../middlewares/authMiddleware';

const router = express.Router();

router.get( "/:id", authMiddleware, TodoController.getUserTodos);
router.post( "/", authMiddleware, TodoController.addTodo);

router.put("/:id", authMiddleware, TodoController.updateUserTodo)
router.delete("/:id", authMiddleware, TodoController.deleteUserTodo)

export default router;