const express = require("express")
const app = express() 


const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const logger = require("./middlewares/logger.js")
const errorHandler = require("./middlewares/errorHandler.js")

app.use(express.json());
app.use(logger);
app.use('/api/products' ,productRoutes);
app.use('/api/auth' ,authRoutes);
app.use(errorHandler);
app.listen(3000 , () => {
    console.log("server is being started")
})