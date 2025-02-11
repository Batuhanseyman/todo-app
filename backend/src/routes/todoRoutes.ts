import express from 'express';
import * as TodoController from "../controllers/todoController";
import  authMiddleware  from '../middlewares/authMiddleware';
import { requestCounterMiddleware } from '../middlewares/requestCounterMiddleware';

const router = express.Router();

router.get( "/:id", authMiddleware, requestCounterMiddleware, TodoController.getUserTodos);
router.post( "/", authMiddleware, requestCounterMiddleware, TodoController.addTodo);
router.post("/insert-many", authMiddleware, requestCounterMiddleware, TodoController.addLocalTodos)

router.put("/:id", authMiddleware, requestCounterMiddleware, TodoController.updateUserTodo)
router.delete("/:id", authMiddleware, requestCounterMiddleware, TodoController.deleteUserTodo)

export default router;