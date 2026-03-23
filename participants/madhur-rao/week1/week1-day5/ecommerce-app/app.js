const express = require("express");
require("dotenv").config();

// DB
const connectMongo = require("./config/mongoConnect");
const { connectSQL,sequelize} = require("./config/sqlConnect");

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");
const {apiLimiter} = require("./middleware/rateLimiter");

const app = express();

// Connect MongoDB
connectMongo();
// After Mongo connection
connectSQL();
sequelize.sync();

// Middlewares
app.use(express.json());
app.use(logger);
app.use(apiLimiter);

// Routes
app.get("/", (req, res) => {
    res.send("API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});