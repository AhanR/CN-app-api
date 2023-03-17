import express from "express";
import { addUser, searchByDomain } from "../controllers/users";
const userRoutes = express();

userRoutes.post('/add', addUser);
userRoutes.get('/indomain::domain', searchByDomain)

export default userRoutes;