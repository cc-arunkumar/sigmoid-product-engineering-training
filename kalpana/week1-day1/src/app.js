const express = require("express");
const app = express();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
app.use(express.json());


const logger = require("./middleware/logger");
app.use(logger);

app.use(productRoutes);
app.use("/api/auth",authRoutes);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

app.listen(3000, ()=>{
    console.log("server is running....")
})

