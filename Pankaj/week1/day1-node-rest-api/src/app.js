const express = require("express");
require("dotenv").config();

const app = express();

// DB connections
const connectDB = require("./config/mongo");
const connectSQL = require("./config/sql");

connectDB();
connectSQL();

// Routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");
const passport = require("./config/passport");

// Body parser
app.use(express.json());

// Custom middlewares
app.use(logger);
app.use(apiLimiter);

// Passport init
app.use(passport.initialize());

// Routes
app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running ...");
});

// Error handler (LAST)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});