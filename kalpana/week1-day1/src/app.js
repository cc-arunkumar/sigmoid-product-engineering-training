const express = require("express");
const app = express();

const productRoutes = require("./routes/productRoutes");
app.use(express.json());
app.use(productRoutes);

const logger = require("./middleware/logger");
app.use(logger);

app.listen(3000, ()=>{
    console.log("server is running....")
})

