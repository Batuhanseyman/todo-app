import express from 'express';
import todoRoutes from './todoRoutes';
import userRoutes from './userRoutes'; 
import requestCounterRoutes  from './requestCounterRoutes'

const router = express.Router();

router.use("/todos", todoRoutes);
router.use("/register", userRoutes);
router.use("/requestcounts", requestCounterRoutes);

export default router;