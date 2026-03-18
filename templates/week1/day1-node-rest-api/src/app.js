const express = require("express");

const app = express();

app.use(express.json());

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middleware/logger"); //for logger
const errorHandler = require("./middleware/errorHandler");// for error handler

app.use(logger);
app.use(productRoutes);
app.use(authRoutes);
app.use(errorHandler);

app.listen(3000,()=>{
    console.log("Server started on port 3000");
});