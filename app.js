const express = require("express");

const app = express();
const productRoutes = require("./routes/productRoutes");
const authRoutes=require("./routes/authRoutes")
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use(productRoutes);
app.use("/api/auth",authRoutes);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

module.exports = app;
