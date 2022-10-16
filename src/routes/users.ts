import express from "express";
import { addUser, searchByDomain } from "../controllers/users";
const userRoutes = express();

userRoutes.post('/add', addUser);
userRoutes.get('/inDomain::domain', searchByDomain)

export default userRoutes;