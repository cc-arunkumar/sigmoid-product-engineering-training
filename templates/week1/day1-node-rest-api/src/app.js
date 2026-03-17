const express = require("express");
const userRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

// Register routes
app.use("/api/users", userRoutes);

module.exports = app;