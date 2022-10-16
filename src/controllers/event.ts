import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import event from "../models/event";
import users from "../models/users";
import { errorMessage } from "../templateResponses/error";

export const addEvent = async (req : Request, res : Response, next : NextFunction) => {
    const eventContent = req.body;

    // validation
    if(eventContent.name == "" || null) return errorMessage(req, res, next, new Error("event name missing"));
    
    // find the signee
    const signee = await users.findById(req.body.signee.userId) || {userDomain : "error in finding user", userId : "error in finding user"};

    // object creation
    const eventEntry = new event({
        eventName : eventContent.name,
        eventId : new mongoose.Types.ObjectId(),
        eventDate : eventContent.date || Date.now(),
        eventDomain: signee.userDomain,
        eventAuthor : signee.userId,
        eventInvitees : [...eventContent.invitees, signee.userId]
    });

    return eventEntry
        .save()
        .then(()=> res.status(201).json({ eventEntry }))
        .catch(error => errorMessage(req, res, next, error))
}

export const allEvents = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const eventsCollection = await event.find();
        return res.status(200).json({ events : eventsCollection });
    } catch (e) {
        return errorMessage(req, res, next, e as Error);
    }
}