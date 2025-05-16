import express from 'express';
import { AdminLogin, AdminRegister } from '../Controllers/AdminControllers.js';



const adminRouter = express.Router();

adminRouter.post('/login', AdminLogin )
adminRouter.post('/register',AdminRegister );

export default adminRouter;