const express = require("express");
const app=express();
const productRoutes =require("./routes/productRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const logger=require("./middleware/logger.js");
const errorHandler = require("./middleware/errorHandler.js");

app.get("/api",(req,res)=>{
    res.send("Welcome to backend");
})

app.use(express.json());

const{apiLimiter}=require("./middleware/rateLimiter.js");
app.use(logger);
app.use(apiLimiter);
app.use(productRoutes);
app.use("/api", authRoutes);
app.use(errorHandler);
app.listen(3000,()=>{
    console.log("server running on port 3000");
});