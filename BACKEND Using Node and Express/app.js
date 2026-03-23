const express = require("express");
const dotenv = require("dotenv")
dotenv.config();
const connectDB = require("./config/mongo");

const app = express();
const PORT = process.env.PORT || 3000;

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes")

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");

const passport = require("./config/passport");

app.use(express.json()); // this is a middleware that converts JSON format data into javascript object (node can read the javascript object not JSON)
app.use(logger);
connectDB();

// Apply rate limmiting globally
app.use(apiLimiter);

app.use(passport.initialize());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);
app.get("/", (req, res) => {
    res.send("Welcome to the Product API");
});

console.log("ENV PORT: ", process.env.PORT);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})

// ORDER of Use
// Global middleware first (first 4) - In first 4 donot change the order keep it same
// Routes next (next 2) - in those also specific first (/api/products), generic later(/api) - reason it can cause overlapping, in this case any ordering can be used
// Error handler last - It will hanlde issues in the last