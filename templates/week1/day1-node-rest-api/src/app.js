import express from "express";

const app = express()

import productRoutes from "./routes/productRoutes.js"
app.use(express.json());
app.use(productRoutes);
app.listen(3000, () => {
    console.log("SERVER ON 3000")
})