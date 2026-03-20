// const express = require("express")
// require('dotenv').config();
// const app = express()

// const productRoutes = require("../routes/productRoutes");
// const authRoutes = require("../routes/authRoutes");
// const logger = require("../middleware/logger");
// const errorHandler = require("../middleware/errorHandler");
// const { apiLimiter } = require("../middleware/Ratelimiter");
// const passport = require("./config/passport");

// app.use(express.json());
// app.use(logger);

// app.use(apiLimiter)

// app.use(passport.initialize());

// app.use(authRoutes);
// app.use(productRoutes);
// app.use(errorHandler);

// app.listen(3000, () => {
//     console.log("Listening on port 3000")
// })
const express = require("express");
require("dotenv").config();

const app = express();

// MongoDB connection
const connectMongo = require("./config/mongo");

// Routes & middleware
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter"); // fixed case
const passport = require("./config/passport");
const { connectSQL } = require("./config/sqlConnection");

// Connect DB
connectMongo();
connectSQL();

app.use(express.json());
app.use(logger);
app.use(apiLimiter);
app.use(passport.initialize());

// Routes
app.use("/api/auth", authRoutes);
app.use(productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// Error handler
app.use(errorHandler);

// Port config
console.log("ENV PORT:", process.env.PORT);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});