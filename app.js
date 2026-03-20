const express = require("express");
require("dotenv").config();

// DB
const connectMongo = require("./config/mongo");
const { connectSQL } = require("./config/sql");

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");

const app = express();

// Connect DBs
connectMongo();
connectSQL();

// Middlewares
app.use(express.json());
app.use(logger);

// Routes
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Error Handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});