require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 3000;
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const connectMongo = require("./config/mongo");
const { connectSQL, sequelize } = require("./config/sql");
app.use(logger);
app.use(apiLimiter);
app.use(express.json());

connectMongo();
connectSQL();
sequelize.sync()
app.use("/api", productRoutes);
app.use("/api", authRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log("server running on Port 3000  ");
});



