import { addToCart,removeFromCart , getCart } from "../Controllers/cartController.js";
import express from "express";
import middlewareauth from "../Middleware/Authentication.js";


const CartRouter = express.Router();

CartRouter.post("/addToCart", middlewareauth , addToCart)
CartRouter.post("/removeFromCart", middlewareauth,removeFromCart)
CartRouter.post("/get", middlewareauth,getCart)

export default CartRouter;
