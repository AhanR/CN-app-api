import { Request, Response, NextFunction } from "express";

export function errorMessage(req : Request, res : Response, next : NextFunction, error : Error) {
    return res.status(500).json({error : error.message});
}