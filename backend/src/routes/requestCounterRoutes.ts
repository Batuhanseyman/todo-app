import express from 'express';
import { getRequestCounts } from '../controllers/requestCounterController';
import  authMiddleware  from '../middlewares/authMiddleware';

const router = express.Router();

router.get("/:id", authMiddleware, getRequestCounts);

export default router;
