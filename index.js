const express = require("express")
const app = express() 

const productRoutes = require("./routes/productRoutes");
const logger = require("./middlewares/logger.js")
const errorHandler = require("./middlewares/errorHandler.js")

app.use(express.json());
app.use(logger);
app.use(errorHandler);

app.use(productRoutes);
app.listen(3000 , () => {
    console.log("server is being started")
})