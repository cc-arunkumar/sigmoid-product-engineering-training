const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/mongo");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authroutes");
const productLogger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");
// const passport = require("./config/passport");

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and then start server
connectDB().then(() => {
    console.log("MongoDB connected");

    app.use(express.json());
    app.use(productLogger);
    // app.use(passport.initialize());

    app.get("/", (req, res) => res.send("API Running"));

    app.use("/api/products", apiLimiter, productRoutes);
    app.use("/api/auth", authRoutes);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
});