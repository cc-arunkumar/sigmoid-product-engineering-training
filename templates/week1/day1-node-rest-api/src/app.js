import express from "express";
import { logger } from "./middleware/logger.js";
const app = express()

import productRoutes from "./routes/productRoutes.js"
app.use(express.json());
app.use(productRoutes);
app.use(logger);
app.listen(3000, () => {
    console.log("SERVER ON 3000")
})