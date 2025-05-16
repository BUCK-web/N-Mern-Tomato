import express from "express";
import { addUser, loginUser, Logout, profile } from "../Controllers/UsersControllers.js";


const UserRouter = express.Router();


UserRouter.post('/signup',addUser)
UserRouter.post('/login',loginUser)
UserRouter.get('/profile', profile)
UserRouter.get("/logout", Logout)


export default UserRouter