const express = require("express");
require("dotenv").config();
const app = express();

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


app.use("/api", productRoutes);     // <-- IMPORTANT FIX
app.use("/api/auth", authRoutes);

// Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handler (should be last)
app.use(errorHandler);

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});