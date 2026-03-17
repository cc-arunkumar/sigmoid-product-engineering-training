const express = require("express")
const app = express() 

const productRoutes = require("./routes/productRoutes");
const logger = require("./middlewares/logger.js")

app.use(express.json());
app.use(logger);

app.use(productRoutes);
app.listen(3000 , () => {
    console.log("server is being started")
})