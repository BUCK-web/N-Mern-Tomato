import express from "express";
import { addFood, CartList, DeleteFood, list } from "../Controllers/Controllers.js";

const FoodRouter = express.Router();



// Routes
FoodRouter.post("/add", addFood); // Handle file upload for "image"
FoodRouter.get("/list", list); // GET request for listing food items
FoodRouter.post("/remove", DeleteFood); // No file upload expected
FoodRouter.post("/cart-list",CartList)

export default FoodRouter;
