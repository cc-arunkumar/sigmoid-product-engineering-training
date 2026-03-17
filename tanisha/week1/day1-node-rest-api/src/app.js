const express = require("express");
const app=express();
app.get("/api",(req,res)=>{
    res.send("Welcome to backend");
})
const productRoutes =require("./routes/productRoutes");
app.use(express.json());
app.use(productRoutes);
app.listen(3000,()=>{
    console.log("server running on port 3000");
});