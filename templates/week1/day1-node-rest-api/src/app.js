import express from "express";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
dotenv.config();
const app = express()

import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import passport from "./config/passport.js";
app.use(logger);
app.use(express.json());
app.use(apiLimiter);
app.use(passport.initialize()); 
app.use(productRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);
app.listen(3000, () => {
    console.log("SERVER ON 3000")
})