import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

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

    router.use((req, res, next) => {
        console.error("invalid query by : ", req.ip);
        return res.status(404).json({message : "invalid query"})
    })

    http.createServer(router).listen(serverPort, ()=>console.log("Server is listening.."));
}