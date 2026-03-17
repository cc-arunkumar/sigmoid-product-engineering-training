const express = require("express");

const app = express()

const productRoutes = require("./routes/productRoutes");

const logger = require("./middlewares/logger");
const error = require("./middlewares/errorHandler")

app.use(express.json());



app.use(logger);

app.use(productRoutes);

app.use(error);



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})