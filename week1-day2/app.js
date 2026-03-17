const express = require("express");
const router = require("./routes/productRoutes");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(express.json());

app.use(logger);
app.use("/api", router)

app.use(errorHandler);

module.exports = app;