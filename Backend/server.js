import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Connection from './config/dbConfig.js';
import FoodRouter from './Routes/FoodRoutes.js';
import UserRouter from './Routes/UserRoutes.js';
import cookieParser from 'cookie-parser';
import CartRouter from './Routes/CartRoute.js';
import { config } from 'dotenv';
import OrderRouter from './Routes/orderRoute.js';
import adminRouter from './Routes/AdminRoute.js';
import path from "path";

config(); // Load .env variables

const app = express();
const __dirname = path.resolve();

// Middleware
app.use(cors({ credentials: true, origin: ["http://localhost:5173", "http://localhost:5174", ] }));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
Connection();

// API Endpoints
app.use("/api/food", FoodRouter);
app.use("/api/user", UserRouter);
app.use("/api/cart", CartRouter);
app.use("/api/payment", OrderRouter);
app.use("/api/admin", adminRouter);


// Serve static frontend files in production
if (process.env.NODE_ENV === "Production") {
    app.use("/", express.static(path.join(__dirname, "/Frontend/dist")));
    
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "/Frontend", "dist", "index.html"));
    });
}

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
