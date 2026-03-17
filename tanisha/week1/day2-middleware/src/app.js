const express = require("express");
const app=express();
app.get("/api",(req,res)=>{
    res.send("Welcome to backend");
})
const productRoutes =require("./routes/productRoutes.js");
app.use(express.json());
const logger=require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");
app.use(logger);
app.use(productRoutes);
app.use(errorHandler);
app.listen(3000,()=>{
    console.log("server running on port 3000");
});