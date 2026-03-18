const express = require("express");

const app = express();

const productRoutes = require("./routes/productRoutes");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/authRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");

app.use(express.json());
app.use(logger);
app.use(apiLimiter);


app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("server started !!");
    console.info("server running on http://localhost:3000/api");
    console.info("products running on http://localhost:3000/api/products");
    console.info("auth running on http://localhost:3000/api/auth/login");
})