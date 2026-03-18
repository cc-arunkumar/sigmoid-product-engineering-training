const express = require("express");
const app = express();

const productRoutes = require("./src/routes/productRoutes");
const authRoutes= require("./src/routes/authRoutes");
const errorHandler = require("./src/middleware/errorHandler");
const logger= require("./src/middleware/logger");
const { apiLimiter } = require("./src/middleware/rateLimiter");

app.use(express.json());

// routes
app.use(productRoutes);
app.use(authRoutes);

app.use(logger);

// error handler (ALWAYS LAST)
app.use(errorHandler);

app.use("/api", apiLimiter);

app.listen(3000,()=>{
    console.log("Server running on 3000")
})

module.exports = app;