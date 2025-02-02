import express from 'express';
import todoRoutes from './todoRoutes';
import userRoutes from './userRoutes'; 

const router = express.Router();

router.use("/todos", todoRoutes);
router.use("/register", userRoutes);

export default router;