import { getAdminOrder, getOrders, placeOrder, verifyOrder } from "../Controllers/orderController.js";
import express from "express";
import middlewareauth from "../Middleware/Authentication.js";

const OrderRouter = express.Router();

OrderRouter.post("/place", middlewareauth, placeOrder);
OrderRouter.post("/verify",verifyOrder)
OrderRouter.get('/getorder', middlewareauth , getOrders)
OrderRouter.get('/adminOrder',getAdminOrder)


export default OrderRouter;