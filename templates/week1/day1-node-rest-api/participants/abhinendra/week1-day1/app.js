const express = require("express");
const app = express();

const productRoutes = require("./src/routes/productRoutes");
const errorHandler = require("./src/middleware/errorHandler");
const logger= require("./src/middleware/logger");

app.use(express.json());

// routes
app.use(productRoutes);

app.use(logger);

// error handler (ALWAYS LAST)
app.use(errorHandler);

app.listen(3000,()=>{
    console.log("Server running on 3000")
})

module.exports = app;