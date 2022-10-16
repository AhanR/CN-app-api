import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import { authenticateUser } from './controllers/users';
import userRoutes from './routes/users';
import eventsRouter from './routes/events';
import cors from 'cors'

dotenv.config();
const router = express();

const serverPort = process.env.PORT || "";
const dbHost = process.env.HOST || "";

mongoose
    .connect(dbHost)
    .then(()=>{
        console.log("connected to db");
        onConnect();
    })
    .catch(e=>console.log("error :", e));

function onConnect():void {

    router.use(cors())
    router.get('/ping', (req, res, next) => res.status(200).json({message : "ping"}))

    //check user and authenticate the user
    router.use(authenticateUser);

    // add new routes here
    router.use("/users", userRoutes);
    router.use("/events", eventsRouter);

    router.use((req, res, next) => {
        console.error("invalid query by : ", req.ip);
        return res.status(404).json({message : "invalid query"})
    })

    http.createServer(router).listen(serverPort, ()=>console.log("Server is listening.."));
}