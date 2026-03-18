import express from "express";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
const app = express()

import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
app.use(logger);
app.use(express.json());
app.use(apiLimiter);
app.use(productRoutes);
app.use(authRoutes);
app.use(errorHandler);
app.listen(3000, () => {
    console.log("SERVER ON 3000")
})