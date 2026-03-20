const express = require("express");
const port = 8080;
require("dotenv").config();
const connectMongo = require("./config/mongo");
const { connectSQL } = require("./config/sql");

const app = express();
connectMongo();
connectSQL();
const logger = require("./middleware/logger");
const productRoutes = require("./routes/productRoutes");
const authRoute = require("./routes/authRoutes");
const productMongoRoutes = require("./routes/productMongoRoutes");
const productSqlRoutes = require("./routes/productSqlRoutes");
const validate = require("./middleware/validate");
const errorHandler = require("./middleware/errorHandler");

const { apilimiter } = require("./middleware/rateLimiter");
const productMongo = require("./models/product.mongo");

app.use(express.json()); //this is middlleware which helps use express json
// app.use(logger);

app.use(apilimiter);

app.use(productRoutes);
app.use(authRoute);
app.use(productMongoRoutes);
app.use(productSqlRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
