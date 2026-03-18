const express = require("express");

const app = express()

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoute");

const logger = require("./middlewares/logger");
const error = require("./middlewares/errorHandler")

app.use(express.json());



app.use(logger);

app.use("/api/products",productRoutes);
app.use("/api/auth",authRoutes);

app.use(error);



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})