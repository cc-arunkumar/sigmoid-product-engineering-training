const express = require("express");
const app = express();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");     
const orderRoutes = require("./routes/orderRoutes");   
const AuthRoutes = require("./routes/authRoutes");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const {apiLimiter} = require("./middleware/rateLimiter");

app.use(express.json());

// middleware
app.use(logger);

app.use(apiLimiter); // Apply rate limiter to all routes

// routes
app.use("/api", productRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/orders", orderRoutes);
app.use("/api/auth", AuthRoutes);

// error handler
app.use(errorHandler);

module.exports = app;