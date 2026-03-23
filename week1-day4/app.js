require("dotenv").config();
const express = require("express");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const connectMongo = require("./config/mongo");

const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");
const { connectSQL, sequelize } = require("./config/sql");

const app = express();
app.use(express.json());

connectMongo();
connectSQL();
sequelize.sync();

app.use(logger);
app.use(apiLimiter);
app.use("/api", productRouter);
app.use("/api/auth", authRouter);

app.use(errorHandler);

module.exports = app;