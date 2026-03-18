const express=require("express");

const app= express();

const productRoutes=require("./Routes/productRoutes")
const logger=require("./middleware/logger")
const errorhandler=require("./middleware/errorHandler")

const authroutes=require("./Routes/authRoutes");
const { apiLimiter } = require("./middleware/rateLimiter");



app.use(express.json()); //enable middleware to express read json

app.use(apiLimiter);
app.use(productRoutes);
app.use(logger);
app.use(errorhandler);
app.use(authroutes);



app.listen(3000, ()=>{
    console.log("server is running...")
});