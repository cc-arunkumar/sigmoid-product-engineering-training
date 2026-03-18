const express = require("express");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(logger);
// Register routes
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
