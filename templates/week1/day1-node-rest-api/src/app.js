const express = require("express");
const connectMongo=require("./config/mongo")
require("dotenv").config();

const app = express();
connectMongo();

const productRoutes = require("./routes/productRoutes");
const productMongoRoutes= require("./routes/productMongoRoutes");
const authRoutes=require("./routes/authRoutes")
const logger=require("./middleware/logger")
const errorHandler=require("./middleware/errorHandler")
const {apiLimiter}= require("./middleware/rateLimiter")
app.use(express.json());
app.use(apiLimiter);
app.use(authRoutes)
app.use(productRoutes);
app.use(productMongoRoutes);
app.use(logger)
app.use(errorHandler);
app.listen(process.env.PORT, () => {
  return console.log(`Server running on port ${process.env.PORT}`);
});
