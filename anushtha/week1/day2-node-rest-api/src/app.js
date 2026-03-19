const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const app = express();

app.get("/api", (req, res) => {
    res.send("Welcome to backend");
});

app.use(express.json());

const productRoutes = require("./routes/productRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const logger = require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");
const { apiLimiter } = require("./middleware/rateLimiter.js");
const passport = require("./config/passport");
const session = require("express-session");

app.use(logger);
app.use(apiLimiter);

app.use(
    session({
        secret: process.env.SESSION_SECRET || process.env.JWT_SECRET || "change-me",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server started on port 3000");
});




