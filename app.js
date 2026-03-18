const express = require("express");

const app = express();
const PORT = 3000

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes")

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { apiLimiter } = require("./middleware/rateLimiter");

app.use(express.json()); // this is a middleware that converts JSON format data into javascript object (node can read the javascript object not JSON)
app.use(logger);

// Apply rate limmiting globally
app.use(apiLimiter);

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})