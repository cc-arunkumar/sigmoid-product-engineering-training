require("dotenv").config();
const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { appLimiter } = require("./middleware/rateLimiter");
const passport = require("./config/passport");

app.use(express.json());
app.use(logger);
app.use(appLimiter);
app.use(passport.initialize());
app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(4000, () => {
    console.log(`Server running at http://localhost:4000`);
});
