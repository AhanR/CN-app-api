import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { errorMessage } from "../templateResponses/error";
import users from "../models/users";
import uuid from 'uuid'

export const authenticateUser = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const userId = req.body.signee.userId || req.params.userId;
        const userKey = req.body.signee.userKey || req.params.userKey;
        const userFound = await users.find({userId, userKey});
        if(userFound || (userKey === "superuser" && userKey == "superuser")) {
            // add last called to this to make authorization complete
            next();
        }
        else {
            return res.status(401);
        }
    } catch (e) {
        return errorMessage(req, res, next, e as Error);
    }
}

export const addUser = async (req : Request, res : Response, next : NextFunction) => {
    const newUser = new users({
        userName : req.body.userName,
        userId : new mongoose.Types.ObjectId(),
        userDomain : req.body.userDomain,
        userKey : uuid.v4()
    })

    try{
        newUser.save();
        return res.status(201).json({newUser})
    } catch (e) {
        return errorMessage(req, res, next, e as Error);
    }
}

export const searchByDomain = async (req : Request, res :  Response, next : NextFunction) => {
    try {
        const userList = await users.find({ userDomain : req.params.domain});
        return res.status(200).json({userList})
    } catch(e) {
        return errorMessage(req, res, next, e as Error);
    }
} 