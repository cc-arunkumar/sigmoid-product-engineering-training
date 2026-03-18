const express = require("express");
const productRoutes = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/authRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");


 

const app = express();

app.use(express.json());
app.use(logger);
app.use(apiLimiter);
app.use("/api/v1/",authRouter);
app.use("/api/v1/products",productRoutes);

app.use(errorHandler);
module.exports = app;