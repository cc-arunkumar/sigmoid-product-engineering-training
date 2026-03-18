const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");

app.use(logger);
app.use(apiLimiter);
app.use("/api", productRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

module.exports = app;