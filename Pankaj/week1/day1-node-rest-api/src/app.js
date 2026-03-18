const express = require("express");
const app = express();

const productRoutes = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());

// middleware
app.use(logger);

// routes
app.use(productRoutes);

// error handler
app.use(errorHandler);

module.exports = app;