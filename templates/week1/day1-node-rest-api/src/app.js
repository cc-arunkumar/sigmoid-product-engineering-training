import express from "express";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
const app = express()

import productRoutes from "./routes/productRoutes.js"
app.use(logger);
app.use(express.json());
app.use(productRoutes);
app.use(errorHandler);
app.listen(3000, () => {
    console.log("SERVER ON 3000")
})