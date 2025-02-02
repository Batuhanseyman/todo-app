import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db"
import router from './routes';



dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api", router);

const port = process.env.PORT;
app.listen(port, 
    () => {
        console.log("Server is running!");
    });