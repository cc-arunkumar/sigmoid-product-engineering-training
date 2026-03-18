const express = require("express");
const app = express();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");     
const orderRoutes = require("./routes/orderRoutes");   

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

// middleware
app.use(logger);

// routes
app.use(productRoutes);
app.use(userRoutes);     
app.use(orderRoutes);    

// error handler
app.use(errorHandler);

module.exports = app;